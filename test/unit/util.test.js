import test from "node:test";
import {createToken} from "../../src/utils/jwt.js";
import jwt from 'jsonwebtoken';
import assert from "node:assert/strict";
import hashPassword from "../../src/utils/hashPasssword.js";

await test('createToken', t => {
    const payload = {
        email: 'seungbin0508@gmail.com',
        name: 'SeungBin Kim'
    };

    const token = createToken(payload);
    const returnPayload = jwt.decode(token, {});

    const twoDaysInSec = 60 * 60 * 24 * 2;
    assert.equal(payload.email, returnPayload.email);
    assert.equal(payload.name, returnPayload.name);
    assert.equal(returnPayload.exp - returnPayload.iat, twoDaysInSec);
});

await test('hash password', async t => {
    const password = 'abc123!@';

    try {
        const {hash, salt} = hashPassword(password);
        assert.equal(salt.length, 32);
        assert.ok(hash);
    } catch (e) {
        console.log(e);
        assert.ifError(e);
    }
});