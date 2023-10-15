import { NextResponse } from "next/server";
import ItemsController from "@controller/items.controller";


export async function handler(req, { params }) {
    const controller = new ItemsController();
    const { status, response } = await controller.history(req, params);

    return NextResponse.json(response, { status })
}

export {
    handler as GET
}