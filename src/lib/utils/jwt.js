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
                const userDecoded = decoded
                // Now, convert decoded to UserSession by removing additional properties
                const userSession = {
                    id: userDecoded.id,
                    email: userDecoded.email,
                    username: userDecoded.username,
                    first_name: userDecoded.first_name,
                    last_name: userDecoded.last_name,
                    image_url: userDecoded.image_url,
                }
                resolve(userSession)
            })
        } catch (err) {
            reject(err)
        }
    })
}