import {MongoMemoryServer} from "mongodb-memory-server";
import connectDB from "../database/index.js";

export default async function createInMemoryDB() {
    // noinspection SpellCheckingInspection
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    let connection;
    try {
        connection = await connectDB(uri);
    } catch (e) {
        throw e;
    }

    connection.stopDatabase = async () => {
        await connection.close();
        await mongod.stop({
            doCleanup: true,
            force: true
        });
    };

    return connection;
}