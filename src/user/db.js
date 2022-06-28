import {getDB} from "../database/index.js";

/**
 *
 * @param ctx
 * @param document
 * @returns {Promise<ObjectId>}
 */
export async function createMember(ctx, document) {
    const {/**@type {import('mongodb').MongoClient} */ client} = ctx;
    const db = getDB(client);
    const Users = db.collection('users');

    try {
        const {insertedId} = await Users.insertOne(document);
        return insertedId;
    } catch (e) {
        throw e;
    }
}