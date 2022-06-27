import test from "node:test";
import {createToken} from "../../src/utils/jwt.js";
import jwt from 'jsonwebtoken';
import assert from "node:assert/strict";

await test('createToken', t => {
    const payload = {
        email: 'seungbin0508@gmail.com',
        name: 'SeungBin Kim'
    }

    const token = createToken(payload)
    const returnPayload = jwt.decode(token, {})

    const twoDaysInSec = 60 * 60 * 24 * 2
    assert.equal(payload.email, returnPayload.email)
    assert.equal(payload.name, returnPayload.name)
    assert.equal(returnPayload.exp - returnPayload.iat, twoDaysInSec)
})

