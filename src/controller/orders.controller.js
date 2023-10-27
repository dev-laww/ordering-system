import Validators from "@lib/validator/orders.validator";
import Response, { getBody, getSession, isAllowed } from "@lib/http";
import OrderRepository from "@repository/order.repo";
import PaymentRepository from "@repository/payment.repo";
import ItemRepository from "@repository/item.repo";

export default class OrdersController {
    repo = new OrderRepository();
    paymentRepo = new PaymentRepository();
    itemRepo = new ItemRepository();

    async orders(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const session = await getSession(req);
        const data = await this.repo.getAll({
            ...(session.role === "user" && { userId: session.id })
        });

        if (!data.length) return Response.notFound("No orders found");

        return Response.ok("Orders", data);
    }

    async create(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.create.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const { paymentMethod, ...order } = requestData.data;

        let total = 0;

        for (const item of order.items) {
            const res = await this.itemRepo.getById(item.itemId);

            if (!res) return Response.badRequest("Item not found");

            total += res.price * item.quantity;

            await this.itemRepo.sell(item.itemId, item.quantity, requestData.data.userId)
        }

        order.total = total;
        const { items, ...orderData } = order;

        const created = await this.repo.create({
            ...orderData
        });

        created.items = await this.repo.createOrderItems(created.id, items);

        const payment = await this.paymentRepo.create({
            orderId: created.id,
            userId: created.userId,
            type: paymentMethod,
            amount: total
        });

        return Response.created("Order created successfully", {
            order: created,
            payment
        });
    }

    async order(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const { id, role } = await getSession(req);
        const data = await this.repo.getById(params.id);

        if (!data || (id !== data.userId && role !== 'admin')) return Response.notFound("Order not found");

        return Response.ok("Order", data);
    }

    async complete(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.complete.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const data = await this.repo.getById(params.id);

        if (!data) return Response.notFound("Order not found");

        if (data.status !== "pending") return Response.badRequest("Cannot complete order");

        const updated = await this.repo.update(params.id, { status: "completed", reason: requestData.data.reason });

        return Response.ok("Order completed", updated);
    }

    async cancel(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const body = await getBody(req);

        if (!body) return Response.badRequest("Invalid request body");

        const requestData = Validators.complete.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const data = await this.repo.getById(params.id);

        if (!data) return Response.notFound("Order not found");

        if (data.status !== "pending") return Response.badRequest("Cannot cancel order");

        const updated = await this.repo.update(params.id, { status: "cancelled", reason: requestData.data.reason });

        return Response.ok("Order cancelled", updated);
    }

    async delete(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const data = await this.repo.getById(params.id);

        if (!data) return Response.notFound("Order not found");

        await this.repo.delete(params.id);

        return Response.ok("Order deleted successfully");
    }
}
