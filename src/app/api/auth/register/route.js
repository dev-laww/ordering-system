import { NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";


export async function handler(req) {
    const controller = new AuthController();
    const { status, response } = await controller.register(req);

    return NextResponse.json(response, { status })
}

export {
    handler as POST
}