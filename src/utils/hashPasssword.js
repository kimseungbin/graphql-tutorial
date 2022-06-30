import crypto from "crypto";

/**
 *
 * @param password {string}
 * @returns {{salt: string, hash: string}}
 */
export default function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return {salt, hash};

}