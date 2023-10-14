import { NextResponse } from "next/server";

import ProfileController from "@controller/profile.controller";


export async function handler(req) {
    const controller = new ProfileController();
    const { status, response } = await controller.changePassword(req);

    return NextResponse.json(response, { status })
}

export {
    handler as PUT
}