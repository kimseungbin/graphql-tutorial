import jwt from 'jsonwebtoken';

export function createToken(payload) {
    // noinspection JSCheckFunctionSignatures
    return jwt.sign(payload, 'jwt-secret', {
        expiresIn: '2 days'
    });
}