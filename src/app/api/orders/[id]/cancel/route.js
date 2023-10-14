import { NextResponse } from "next/server";
import OrdersController from "@controller/orders.controller";


export async function handler(req, { params }) {
    const controller = new OrdersController();
    const { status, response } = await controller.cancel(req, params);

    return NextResponse.json(response, { status })
}

export {
    handler as POST
}