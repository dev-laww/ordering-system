import { NextResponse } from "next/server";
import PaymentsController from "@controller/payments.controller";


export async function handler(req) {
    const controller = new PaymentsController();
    const { status, response } = await controller.payments(req);

    return NextResponse.json(response, { status })
}

export {
    handler as GET
}