import { NextResponse } from "next/server";
import PaymentsController from "@controller/payments.controller";


export async function handler(req, { params }) {
    const controller = new PaymentsController();
    let status, response;

    switch (req.method) {
        case "GET":
            ({ status, response } = await controller.payment(req, params));
            break;
        case "DELETE":
            ({ status, response } = await controller.delete(req, params));
            break;
        default:
            ({ status, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status })
}

export {
    handler as GET,
    handler as DELETE
}