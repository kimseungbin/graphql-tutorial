import test from "node:test";
import {MongoMemoryServer} from "mongodb-memory-server";
// noinspection SpellCheckingInspection
const mongod = await MongoMemoryServer.create()
const uri = mongod.getUri()

await test('Connect to database', async t => {
    const connection = await connectDB(uri)
})

await mongod.stop()