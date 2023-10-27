/**
 * Enum for HTTP status codes
 *
 * @readonly
 * @type {Readonly<{INTERNAL_SERVER_ERROR: number, CREATED: number, METHOD_NOT_ALLOWED: number, UNAUTHORIZED: number, BAD_REQUEST: number, UNPROCESSABLE_ENTITY: number, NOT_FOUND: number, OK: number, FORBIDDEN: number}>}
 */
export const STATUS_CODE = Object.freeze({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    METHOD_NOT_ALLOWED: 405
});

/**
 * Enum for response status
 *
 * @readonly
 * @type {Readonly<{SUCCESS: string, FAILED: string}>}
 */
export const STATUS = Object.freeze({
    SUCCESS: 'success',
    FAILED: 'failed'
});


/**
 * Enum for error codes
 *
 * @readonly
 * @type {Readonly<{INTERNAL_SERVER_ERROR: string, METHOD_NOT_ALLOWED: string, UNAUTHORIZED: string, UNPROCESSABLE_ENTITY: string, BAD_REQUEST: string, NOT_FOUND: string, VALIDATION_ERROR: string, INVALID_CREDENTIALS: string, FORBIDDEN: string}>}
 */
export const ERROR_CODE = Object.freeze({
    UNAUTHORIZED: 'unauthorized',
    NOT_FOUND: 'not-found',
    UNPROCESSABLE_ENTITY: 'unprocessable-entity',
    METHOD_NOT_ALLOWED: 'method-not-allowed',
    INTERNAL_SERVER_ERROR: 'internal-server-error',
    BAD_REQUEST: 'bad-request',
    VALIDATION_ERROR: 'validation-error',
    INVALID_CREDENTIALS: 'invalid-credentials',
    FORBIDDEN: 'forbidden'
});

/**
 * Enum for token type
 *
 * @readonly
 * @type {Readonly<{EMAIL_CONFIRMATION_TOKEN: symbol, PASSWORD_RESET_TOKEN: string, EMAIL_CONFIRMATION_OTP: string, PASSWORD_RESET_OTP: string}>}
 */
export const TOKEN_TYPE = Object.freeze({
    EMAIL_CONFIRMATION_TOKEN: Symbol('token:email-confirmation'),
    PASSWORD_RESET_TOKEN: 'token:password-reset',
    EMAIL_CONFIRMATION_OTP: 'otp:email-confirmation',
    PASSWORD_RESET_OTP: 'otp:password-reset'
})


/**
 * Constant for token expiry
 *
 * @type {number}
 */
export const TOKEN_OTP_EXPIRY = 60 * 60 * 1000; // 1 hour

/**
 * Enum for order status
 *
 * @readonly
 * @type {Readonly<{CANCELLED: string, COMPLETED: string, PENDING: string}>}
 */
export const ORDER_STATUS = Object.freeze({
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    PENDING: 'failed'
})

/**
 * Enum for payment status
 *
 * @readonly
 * @type {Readonly<{CANCELLED: string, COMPLETED: string, PENDING: string}>}
 */
export const PAYMENT_STATUS = ORDER_STATUS;


/**
 * Constant for common resources
 *
 * @type {string[]}
 */
export const COMMON_RESOURCES = [
    'GET/api/items',
    'GET/api/items/:id',
];

export const USER_RESOURCES = [
    'GET/api/orders',
    'GET/api/orders/:id',
    'POST/api/orders',
    'POST/api/orders/:id/cancel',
]

/**
 * Enum for payment method
 *
 * @readonly
 * @type {Readonly<{EWALLET: string, CASH: string}>}
 */
export const PAYMENT_METHOD = Object.freeze({
    CASH: 'cash',
    EWALLET: 'ewallet'
})

/**
 * Enum for user role
 *
 * @readonly
 * @type {Readonly<{ADMIN: string, USER: string}>}
 */
export const ROLE = Object.freeze({
    ADMIN: 'admin',
    USER: 'user'
})


/**
 * Enum for item size
 *
 * @readonly
 * @type {Readonly<{S: string, L: string, M: string}>}
 */
export const ITEM_SIZE = Object.freeze({
    S: 'small',
    M: 'medium',
    L: 'large',
})

/**
 * Enum for record type
 *
 * @readonly
 * @type {Readonly<{SALE: string, RESTOCK: string}>}
 */
export const RECORD_TYPE = Object.freeze({
    RESTOCK: 'restock',
    SALE: 'sale'
})