import { NextResponse } from "next/server";
import OrdersController from "@controller/orders.controller";


export async function handler(req, { params }) {
    const controller = new OrdersController();
    let status, response;

    switch (req.method) {
        case "GET":
            ({ status, response } = await controller.order(req, params));
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