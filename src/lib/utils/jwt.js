import { sign, verify } from "jsonwebtoken";

/**
 * Generates a JWT token
 *
 * @param payload Payload to sign
 * @param secret Secret to sign
 * @param expiresIn Expiry time
 * @return {string}
 */
export const generateToken = (
    payload,
    secret,
    expiresIn
) => {
    return sign(payload, secret, {
        expiresIn,
    })
}

/**
 * Verifies a JWT token
 *
 * @param token Token to verify
 * @param secret Secret to verify
 * @return {Promise<Object | null>}
 */
export const verifyToken = (
    token,
    secret
) => {
    return new Promise((resolve, reject) => {
        try {
            verify(token, secret, (err, decoded) => {
                if (err || !decoded) {
                    return reject(err)
                }

                const { iat, exp, ...session } = decoded

                resolve(session)
            })
        } catch (err) {
            reject(err)
        }
    })
}