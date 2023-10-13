import Validators from "@lib/validator/auth.validator";
import Response from "@lib/http";

export default class AuthController {

    async hello(req) {
        return Response.ok("Hello World");
    }
}
