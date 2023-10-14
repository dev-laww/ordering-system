import { NextResponse } from "next/server";

import ProfileController from "@controller/profile.controller";


export async function handler(req) {
    const controller = new ProfileController();
    let status, response;

    switch (req.method) {
        case "GET":
            ({ status, response } = await controller.addresses(req));
            break;
        case "POST":
            ({ status, response } = await controller.addAddress(req));
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