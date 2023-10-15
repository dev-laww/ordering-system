import { NextResponse } from "next/server";
import ItemsController from "@controller/items.controller";


export async function handler(req) {
    const controller = new ItemsController();
    let status, response;

    switch (req.method) {
        case "GET":
            ({ status, response } = await controller.items(req));
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