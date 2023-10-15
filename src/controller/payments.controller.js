import Validators from "@lib/validator/payments.validator";
import Response, { isAllowed } from "@lib/http";
import PaymentRepository from "@repository/payment.repo";

export default class PaymentsController {
    repo = new PaymentRepository();

    async payments(req) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const data = await this.repo.getAll();

        if (!data.length) return Response.notFound("No payments found");

        return Response.ok("Payments retrieved", data);
    }

    async payment(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const payment = await this.repo.getById(params.id);

        if (!payment) return Response.notFound("Payment not found");

        return Response.ok("Payment retrieved", payment);
    }

    async markAsCompleted(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const payment = await this.repo.getById(params.id);

        if (!payment) return Response.notFound("Payment not found");

        const requestData = Validators.markAsCompleted.safeParse(payment);

        if (!requestData.success) return Response.badRequest(requestData.error.errors);

        const updated = await this.repo.completed(params.id, requestData.data.reason);

        return Response.ok("Payment updated", updated);
    }

    async complete(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const payment = await this.repo.getById(params.id);

        if (!payment) return Response.notFound("Payment not found");
        if (payment.status !== "pending") return Response.badRequest("Payment is not pending");

        const updated = await this.repo.update(params.id, { status: "completed" });

        return Response.ok("Payment updated", updated);
    }

    async delete(req, params) {
        const allowed = await isAllowed(req);

        if (allowed.status !== 200) return allowed;

        const payment = await this.repo.getById(params.id);

        if (!payment) return Response.notFound("Payment not found");

        await this.repo.delete(params.id);

        return Response.ok("Payment deleted");
    }
}
