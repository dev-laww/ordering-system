import { NextResponse } from "next/server";
import ItemsController from "@controller/items.controller";


export async function handler(req, { params }) {
    const controller = new ItemsController();
    let status, response;

    switch (req.method) {
        case "GET":
            ({ status, response } = await controller.item(req, params));
            break;
        case "PUT":
            ({ status, response } = await controller.update(req, params));
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
    handler as PUT,
    handler as DELETE
}