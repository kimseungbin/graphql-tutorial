import {getCollection} from "../database/index.js";
import {ObjectId} from "mongodb";


/**
 *
 * @param ctx
 * @param document
 * @returns {Promise<ObjectId>}
 */
export async function createMember(ctx, document) {
    const {/**@type {import('mongodb').MongoClient} */ client} = ctx;
    const Members = getCollection(client, 'members');

    try {
        const { /** @type {ObjectId} */ insertedId} = await Members.insertOne(document);
        return insertedId;
    } catch (e) {
        throw e;
    }
}

/**
 *
 * @param ctx
 * @param _id {ObjectId}
 * @returns {Promise<Document>}
 */
export async function findMember(ctx, _id) {
    const {/**@type {import('mongodb').MongoClient} */ client} = ctx;
    const Members = getCollection(client, 'members');

    try {
        return await Members.findOne({_id});
    } catch (e) {
        throw e;
    }
}