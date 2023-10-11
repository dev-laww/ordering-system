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


export const TOKEN_TYPE = Object.freeze({
    EMAIL_CONFIRMATION_TOKEN: 'token:email-confirmation',
    PASSWORD_RESET_TOKEN: 'token:password-reset',
    EMAIL_CONFIRMATION_OTP: 'otp:email-confirmation',
    PASSWORD_RESET_OTP: 'otp:password-reset'
})

export const TOKEN_OTP_EXPIRY = 60 * 60 * 1000; // 1 hour

export const ORDER_STATUS = Object.freeze({
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    PENDING: 'failed'
})

export const PAYMENT_STATUS = ORDER_STATUS;

export const COMMON_RESOURCES = [
    'GET/api/products',
    'GET/api/products/:id',
    'GET/api/products/:id/variants',
    'GET/api/products/:id/reviews',
    'GET/api/products/:id/categories',
    'GET/api/variants',
    'GET/api/variants/:id',
    'GET/api/variants/:id/reviews',
    'GET/api/variants/:id/reviews/:reviewId',
    'GET/api/categories',
    'GET/api/categories/:id',
    'GET/api/categories/:id/products',
    'GET/api/shipping-methods',
    'GET/api/shipping-methods/:id',
    'GET/api/coupons/:code'
];

export const PAYMENT_METHOD = Object.freeze({
    CASH: 'cash',
    EWALLET: 'ewallet'
})

export const ROLE = Object.freeze({
    ADMIN: 'admin',
    USER: 'user'
})

export const ITEM_SIZE = Object.freeze({
    S: 'small',
    M: 'medium',
    L: 'large',
})

export const RECORD_TYPE = Object.freeze({
    RESTOCK: 'restock',
    SALE: 'sale'
})