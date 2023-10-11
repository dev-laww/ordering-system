import { sign, verify } from "jsonwebtoken";

export const generateToken = (
    payload,
    secret,
    expiresIn
) => {
    return sign(payload, secret, {
        expiresIn,
    })
}

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