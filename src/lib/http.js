import { ERROR_CODE, STATUS, STATUS_CODE, COMMON_RESOURCES, USER_RESOURCES } from "@lib/constants";
import { verifyAccessToken } from "@utils/token";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

const Response = {
    /**
     * Create a success response
     *
     * @param message Response message
     * @param data Response data
     * @return {{response: {status: string, message: string, data: *}, status: number}}
     */
    ok: (message = undefined, data = undefined) => ({

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
    badRequest: (message = undefined, errors) => ({
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
    unauthorized: (message = undefined) => ({
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
    validationError: (errors, message = undefined) => {
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

    if (!token) return null;

    return await verifyAccessToken(token);
}

/**
 * Get body from request
 *
 * @param req
 * @return {Promise<*|null>}
 */
export const getBody = async (req) => {
    try {
        return await req.json();
    } catch (e) {
        return null;
    }
}

const getRequestedResource = (resource, availableResources) => {
    for (const available of availableResources) {
        const pattern = available.toString().replace(/:[^/]+/g, '([^/]+)')
        const regex = new RegExp(`^${ pattern }$`);

        if (resource.match(regex)) return available;
    }

    return undefined;
}

export const isAllowed = async (req) => {
    const path = req.nextUrl.pathname;
    let token = req.headers.get("Authorization");
    const resource = `${req.method}${path}`;

    if (path.startsWith("/api/auth")) return Response.ok();

    const common = getRequestedResource(resource, COMMON_RESOURCES);

    if (common) return Response.ok();
    if (!token) return Response.unauthorized("Please login first");

    const session = await getSession(req);

    if (!session) return Response.unauthorized("Invalid access token");
    if (path.startsWith("/api/profile")) {
        if (!session.confirmed) return Response.unauthorized("Please confirm your email address first");

        return Response.ok();
    }

    const { role } = session;

    if (role === "admin") return Response.ok();

    const userResource = getRequestedResource(resource, USER_RESOURCES);

    if (userResource) return Response.ok();

    return Response.forbidden;
}

export async function refreshToken(token) {
    const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ token }),
    });

    if (!res.ok) return null;

    return await res.json().then(data => data.data.accessToken);
}

export async function fetchData(url, options, session) {
    const res = await fetch(url, options);

    if (res.status === STATUS_CODE.UNAUTHORIZED && session) {
        console.log(session)
        const token = await refreshToken(session.refreshToken);

        if (!token) return null;

        return await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            }
        });
    }

    return await res.json();
}

export default Response;