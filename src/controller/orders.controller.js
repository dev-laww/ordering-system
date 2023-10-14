import Validators from "@lib/validator/orders.validator";
import Response, { getBody, isAllowed } from "@lib/http";
import OrderRepository from "@repository/order.repo";
import PaymentRepository from "@repository/payment.repo";

export default class OrdersController {
    repo = new OrderRepository();
    paymentRepo = new PaymentRepository();

    async orders(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const data = await this.repo.getAll();

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
            const res = await this.repo.getOrderItem(item.id);

            if (!res) return Response.badRequest("Item not found");

            total += res.price * item.quantity;
        }

        order.total = total;

        const created = await this.repo.create(order);

        const payment = await this.paymentRepo.create({
            orderId: created.id,
            method: paymentMethod,
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

        const data = await this.repo.getById(params.id);

        if (!data) return Response.notFound("Order not found");

        return Response.ok("Order", data);
    }

    async complete(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const data = await this.repo.getById(params.id);

        if (!data) return Response.notFound("Order not found");

        if (data.status !== "pending") return Response.badRequest("Cannot complete order");

        const updated = await this.repo.update(params.id, { status: "completed" });

        return Response.ok("Order completed successfully", updated);
    }

    async cancel(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const data = await this.repo.getById(params.id);

        if (!data) return Response.notFound("Order not found");

        if (data.status !== "pending") return Response.badRequest("Cannot cancel order");

        const updated = await this.repo.update(params.id, { status: "cancelled" });

        return Response.ok("Order cancelled successfully", updated);
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
