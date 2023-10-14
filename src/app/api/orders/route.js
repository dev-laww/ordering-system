import { NextResponse } from "next/server";
import OrdersController from "@controller/orders.controller";


export async function handler(req) {
    const controller = new OrdersController();
    let status, response;

    switch (req.method) {
        case "GET":
            ({ status, response } = await controller.orders(req));
            break;
        case "POST":
            ({ status, response } = await controller.create(req));
            break;
        default:
            ({ status, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status })
}

export {
    handler as GET,
    handler as POST
}