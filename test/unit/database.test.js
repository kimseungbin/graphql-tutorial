import test from "node:test";
import assert from "node:assert/strict";
import createInMemoryConnection from "../../src/utils/inMemoryDB.js";
import {MongoClient} from 'mongodb';


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