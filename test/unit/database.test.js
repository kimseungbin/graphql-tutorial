import test from "node:test";
import {MongoMemoryServer} from "mongodb-memory-server";
import connectDB from "../../src/database/index.js";
import assert from "node:assert/strict";


await test('Connect to database', async t => {
    // noinspection SpellCheckingInspection
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    let connection;
    try {
        connection = await connectDB(uri);
    } catch (e) {
        console.error(e);
        assert.ifError(e);
    } finally {
        await connection.close();
        await mongod.stop({
            doCleanup: true,
            force: true
        });
    }
});