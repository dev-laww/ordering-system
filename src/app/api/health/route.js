import { NextResponse } from "next/server";
import Response from "@lib/http";

class HealthController {
    async check(req) {
        return Response.ok("Health check successful");
    }
}


export async function handler(req) {
    const controller = new HealthController();
    const { status, response } = await controller.check(req);

    return NextResponse.json(response, { status })
}

export {
    handler as GET
}

