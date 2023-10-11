import bcrypt from 'bcryptjs';

/**
 * Hashes a password
 *
 * @param password Password to hash
 * @return {Promise<string>}
 */
export const hash = async (password) => {
    return await bcrypt.hash(password, 10);
}

/**
 * Compares a password with a hash
 *
 * @param password Password to compare
 * @param hash Hash to compare
 * @return {Promise<boolean>}
 */
export const compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}