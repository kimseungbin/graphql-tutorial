import test from "node:test";
import assert from "node:assert/strict";
import createInMemoryConnection from "../../src/utils/inMemoryDB.js";
import {ObjectId} from 'mongodb';
import {createMember} from "../../src/user/db.js";

const member = {
    name: 'SeungBin Kim',
    email: 'seungbin0508@gmail.com',
    password: 'abc123'
};

await test('Connect to database', async t => {
    let connection;
    try {
        connection = await createInMemoryConnection();
    } catch (e) {
        assert.ifError(e);
    } finally {
        await connection.stopDatabase();
    }
});

await test('Create a member account', async t => {
    const client = await createInMemoryConnection();

    try {
        const insertedId = await createMember({client}, member);
        const result = ObjectId.isValid(insertedId);
        assert.ok(result);
    } catch (e) {
        assert.ifError(e);
    } finally {
        await client.stopDatabase();
    }
});

await test('Find a member account', async t => {
    const client = await createInMemoryConnection();

    try {
        const insertedId = await createMember({client}, member);
        const member = await findMember({client}, insertedId);
        const result = Object.entries(member).every(([key, value]) => member[key] === value);
        assert.ok(result);
    } catch (e) {
        assert.ifError(e);
    } finally {
        await client.stopDatabase();
    }
});