import { ERROR_CODE, STATUS, STATUS_CODE } from "@lib/constants";
import { verifyAccessToken } from "@utils/token";


const Response = {
    ok: (message, data) => ({

        statusCode: STATUS_CODE.OK,
        response: {
            status: STATUS.SUCCESS,
            message: message || "Success",
            data
        }
    }),

    created: (message, data) => ({
        statusCode: STATUS_CODE.CREATED,
        response: {
            status: STATUS.SUCCESS,
            message: message || "Created",
            data
        }

    }),

    badRequest: (message, errors) => ({
        statusCode: STATUS_CODE.BAD_REQUEST,
        response: {
            code: ERROR_CODE.BAD_REQUEST,
            status: STATUS.FAILED,
            message: message || "Bad request",
            errors
        }
    }),


    unauthorized: (message) => ({
        statusCode: STATUS_CODE.UNAUTHORIZED,
        response: {
            code: ERROR_CODE.UNAUTHORIZED,
            status: STATUS.FAILED,
            message: message || "Unauthorized"
        }
    }),

    notFound: (message) => ({
        statusCode: STATUS_CODE.NOT_FOUND,
        response: {
            code: ERROR_CODE.NOT_FOUND,
            status: STATUS.FAILED,
            message: message || "Not found"
        }
    }),


    internalServerError: (message) => ({
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        response: {
            code: ERROR_CODE.INTERNAL_SERVER_ERROR,
            status: STATUS.FAILED,
            message: message || "Unknown error"
        }
    }),


    validationError: (errors, message) => {
        const errorMessages = errors.map(error => error.message).join(", ");
        return {
            statusCode: STATUS_CODE.UNPROCESSABLE_ENTITY,
            response: {
                code: ERROR_CODE.VALIDATION_ERROR,
                status: STATUS.FAILED,
                message: message || "Validation error",
                errors: errorMessages,
            }
        }
    },

    invalidCredentials: (message) => ({
        statusCode: STATUS_CODE.UNAUTHORIZED,
        response: {
            code: ERROR_CODE.INVALID_CREDENTIALS,
            status: STATUS.FAILED,
            message: message || "Invalid credentials"
        }
    }),


    error: (statusCode, message, error) => ({
        statusCode: statusCode,
        response: {
            status: STATUS.FAILED,
            message: message,
            code: error
        }
    }),


    methodNotAllowed: {
        statusCode: STATUS_CODE.METHOD_NOT_ALLOWED,
        response: {
            code: ERROR_CODE.METHOD_NOT_ALLOWED,
            status: STATUS.FAILED,
            message: "Method not allowed"
        }
    },

    forbidden: {
        statusCode: STATUS_CODE.FORBIDDEN,
        response: {
            code: ERROR_CODE.FORBIDDEN,
            status: STATUS.FAILED,
            message: "User is not allowed to perform this action"
        }
    }
}

export const getSession = async (req) => {
    const token = req.headers.get("Authorization").split(" ")[1];

    return (await verifyAccessToken(token));
}

export default Response;