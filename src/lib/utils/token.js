import { generateToken, verifyToken } from "@utils/jwt";
import crypto from "crypto";

/**
 * Generates a JWT access token
 *
 * @param payload Payload to sign
 * @return {string}
 */
export const generateAccessToken = (
    payload,
) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET not found');
    }

    if (!process.env.ACCESS_TOKEN_EXPIRY) {
        throw new Error('ACCESS_TOKEN_EXPIRY not found');
    }

    return generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRY
    );
}

/**
 * Generates a JWT refresh token
 *
 * @param payload Payload to sign
 * @return {string}
 */
export const generateRefreshToken = (
    payload,
) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET not found');
    }

    if (!process.env.REFRESH_TOKEN_EXPIRY) {
        throw new Error('REFRESH_TOKEN_EXPIRY not found');
    }

    return generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRY
    );
}

/**
 * Verifies a JWT access token
 *
 * @param token Token to verify
 * @return {Promise<undefined|Object|null>}
 */
export const verifyAccessToken = async (
    token,
) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET not found');
    }

    try {
        return await verifyToken(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        );
    } catch (err) {
        return undefined;
    }
}

/**
 * Verifies a JWT refresh token
 *
 * @param token Token to verify
 * @return {Promise<undefined|{}|null>}
 */
export const verifyRefreshToken = async (
    token,
) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET not found');
    }

    try {
        return await verifyToken(
            token,
            process.env.REFRESH_TOKEN_SECRET,
        );
    } catch (err) {
        return undefined;
    }
}

/**
 * Generates a random token
 *
 * @return {string}
 */
export const generateRandomToken = () => crypto.randomBytes(32).toString('hex');

/**
 * Generates a random OTP
 *
 * @return {string}
 */
export const generateOTP = () => crypto.randomInt(100000, 999999).toString();

/**
 * Generates a page token
 * @param token Token to generate
 * @return {string}
 */
export function generatePageToken(token) {
    const userJson = JSON.stringify(token);

    return Buffer.from(userJson).toString("base64");
}

/**
 * Parses a page token
 *
 * @param token Token to parse
 * @return {undefined|Object}
 */
export function parsePageToken(token) {
    try {
        const userJson = Buffer.from(token, "base64").toString("ascii");

        return JSON.parse(userJson);
    } catch (err) {
        return undefined;
    }
}
