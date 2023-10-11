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

export const STATUS = Object.freeze({
    SUCCESS: 'success',
    FAILED: 'failed'
});


export const ERROR_CODE = Object.freeze({
    UNAUTHORIZED: 'error:unauthorized',
    NOT_FOUND: 'error:not_found',
    UNPROCESSABLE_ENTITY: 'error:unprocessable_entity',
    METHOD_NOT_ALLOWED: 'error:method_not_allowed',
    INTERNAL_SERVER_ERROR: 'error:internal_server_error',
    BAD_REQUEST: 'error:bad_request',
    VALIDATION_ERROR: 'error:validation_error',
    INVALID_CREDENTIALS: 'error:invalid_credentials',
    FORBIDDEN: 'error:forbidden'
});


export const TOKEN_TYPE = Object.freeze({
    EMAIL_CONFIRMATION_TOKEN: 'token:email_confirmation',
    PASSWORD_RESET_TOKEN: 'token:password_reset',
    EMAIL_CONFIRMATION_OTP: 'otp:email_confirmation',
    PASSWORD_RESET_OTP: 'otp:password_reset'
})

export const TOKEN_OTP_EXPIRY = 60 * 60 * 1000; // 1 hour

export const ORDER_STATUS = Object.freeze({
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    PENDING: 'failed'
})

export const PAYMENT_STATUS = ORDER_STATUS;

export const COMMON_RESOURCES = [
    "GET/api/products",
    "GET/api/products/:id",
    "GET/api/products/:id/variants",
    "GET/api/products/:id/reviews",
    "GET/api/products/:id/categories",
    "GET/api/variants",
    "GET/api/variants/:id",
    "GET/api/variants/:id/reviews",
    "GET/api/variants/:id/reviews/:reviewId",
    "GET/api/categories",
    "GET/api/categories/:id",
    "GET/api/categories/:id/products",
    "GET/api/shipping-methods",
    "GET/api/shipping-methods/:id",
    "GET/api/coupons/:code"
];

export const PAYMENT_METHOD = Object.freeze({
    CASH: 'payment-method:cash',
    EWALLET: 'payment-method:ewallet'
})

export const ROLE = Object.freeze({
    ADMIN: 'role:admin',
    USER: 'role:user'
})

export const ITEM_SIZE = Object.freeze({
    S: 'size:s',
    M: 'size:m',
    L: 'size:l',
})

export const RECORD_TYPE = Object.freeze({
    RESTOCK: 'record:restock',
    SALE: 'record:sale'
})