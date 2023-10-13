import { ERROR_CODE, STATUS, STATUS_CODE } from "@lib/constants";
import { verifyAccessToken } from "@utils/token";


const Response = {
    /**
     * Create a success response
     *
     * @param message Response message
     * @param data Response data
     * @return {{response: {status: string, message: string, data: *}, status: number}}
     */
    ok: (message = null, data = null) => ({

        status: STATUS_CODE.OK,
        response: {
            status: STATUS.SUCCESS,
            message: message || "Success",
            data
        }
    }),

    /**
     * Create a created response
     *
     * @param message Response message
     * @param data Response data
     * @return {{response: {data, message: string, status: string}, status: number}}
     */
    created: (message, data) => ({
        status: STATUS_CODE.CREATED,
        response: {
            status: STATUS.SUCCESS,
            message: message || "Created",
            data
        }

    }),

    /**
     * Create a bad request response
     *
     * @param message Response message
     * @param errors Response errors
     * @return {{response: {code: string, message: string, errors, status: string}, status: number}}
     */
    badRequest: (message, errors) => ({
        status: STATUS_CODE.BAD_REQUEST,
        response: {
            code: ERROR_CODE.BAD_REQUEST,
            status: STATUS.FAILED,
            message: message || "Bad request",
            errors
        }
    }),

    /**
     * Create an unauthorized response
     *
     * @param message Response message
     * @return {{response: {code: string, message: string, status: string}, status: number}}
     */
    unauthorized: (message) => ({
        status: STATUS_CODE.UNAUTHORIZED,
        response: {
            code: ERROR_CODE.UNAUTHORIZED,
            status: STATUS.FAILED,
            message: message || "Unauthorized"
        }
    }),

    /**
     * Create a not found response
     *
     * @param message Response message
     * @return {{response: {code: string, message: string, status: string}, status: number}}
     */
    notFound: (message) => ({
        status: STATUS_CODE.NOT_FOUND,
        response: {
            code: ERROR_CODE.NOT_FOUND,
            status: STATUS.FAILED,
            message: message || "Not found"
        }
    }),

    /**
     * Create an internal server error response
     *
     * @param message Response message
     * @return {{response: {code: string, message: string, status: string}, status: number}}
     */
    internalServerError: (message) => ({
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        response: {
            code: ERROR_CODE.INTERNAL_SERVER_ERROR,
            status: STATUS.FAILED,
            message: message || "Unknown error"
        }
    }),

    /**
     * Create a validation error response
     *
     * @param errors Validation errors
     * @param message Response message
     * @return {{response: {code: string, message: string, errors: *, status: string}, status: number}}
     */
    validationError: (errors, message) => {
        const errorMessages = errors.map(error => error.message).join(", ");
        return {
            status: STATUS_CODE.UNPROCESSABLE_ENTITY,
            response: {
                code: ERROR_CODE.VALIDATION_ERROR,
                status: STATUS.FAILED,
                message: message || "Validation error",
                errors: errorMessages,
            }
        }
    },

    /**
     * Create an invalid credentials response
     *
     * @param message Response message
     * @return {{response: {code: string, message: string, status: string}, status: number}}
     */
    invalidCredentials: (message) => ({
        status: STATUS_CODE.UNAUTHORIZED,
        response: {
            code: ERROR_CODE.INVALID_CREDENTIALS,
            status: STATUS.FAILED,
            message: message || "Invalid credentials"
        }
    }),

    /**
     * Create a failed response
     *
     * @param status Response status
     * @param message Response message
     * @param error Response error
     * @return {{response: {code, message, status: string}, status}}
     */
    error: (status, message, error) => ({
        status: status,
        response: {
            status: STATUS.FAILED,
            message: message,
            code: error
        }
    }),

    methodNotAllowed: {
        status: STATUS_CODE.METHOD_NOT_ALLOWED,
        response: {
            code: ERROR_CODE.METHOD_NOT_ALLOWED,
            status: STATUS.FAILED,
            message: "Method not allowed"
        }
    },

    forbidden: {
        status: STATUS_CODE.FORBIDDEN,
        response: {
            code: ERROR_CODE.FORBIDDEN,
            status: STATUS.FAILED,
            message: "User is not allowed to perform this action"
        }
    }
}


/**
 * Get session from request
 *
 * @param req
 * @return {Promise<Object>}
 */
export const getSession = async (req) => {
    const token = req.headers.get("Authorization").split(" ")[1];

    return (await verifyAccessToken(token));
}

export default Response;