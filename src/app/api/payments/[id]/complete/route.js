import { NextResponse } from "next/server";
import PaymentsController from "@controller/payments.controller";


export async function handler(req, { params }) {
    const controller = new PaymentsController();
    const { status, response } = await controller.complete(req, params);

    return NextResponse.json(response, { status })
}

export {
    handler as POST
}