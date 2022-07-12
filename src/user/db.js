import {getCollection} from "../database/index.js";
import {ObjectId} from "mongodb";
import hashPassword from "../utils/hashPasssword.js";


/**
 *
 * @param ctx
 * @param document
 * @returns {Promise<ObjectId>}
 */
export async function createMember(ctx, document) {
    const {/**@type {import("mongodb").MongoClient} */ client} = ctx;
    const {password} = document;
    const {hash, salt} = hashPassword(password);
    document = {
        ...document,
        password: hash,
        salt
    };

    const Members = getCollection(client, "members");

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
 * @param filter {Object}
 * @returns {Promise<Document>}
 */
export async function findMember(ctx, filter) {
    const {/**@type {import("mongodb").MongoClient} */ client} = ctx;
    const Members = getCollection(client, "members");

    try {
        return await Members.findOne(filter);
    } catch (e) {
        throw e;
    }
}