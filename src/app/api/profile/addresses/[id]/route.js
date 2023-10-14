import { NextResponse } from "next/server";

import ProfileController from "@controller/profile.controller";


export async function handler(req, { params }) {
    const controller = new ProfileController();
    let status, response;

    switch (req.method) {
        case "GET":
            ({ status, response } = await controller.address(req, params));
            break;
        case "PUT":
            ({ status, response } = await controller.updateAddress(req, params));
            break;
        case "DELETE":
            ({ status, response } = await controller.deleteAddress(req, params));
            break;
        default:
            ({ status, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status })
}

export {
    handler as GET,
    handler as PUT,
    handler as DELETE
}