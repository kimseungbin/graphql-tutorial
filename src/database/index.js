import {MongoClient, Collection} from "mongodb";

export default async function connectDB(uri) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db('admin').command({ping: 1});
        if (process.env.NODE_ENV === 'development') {
            console.log('Database connected successfully to server');
        }
    } catch (e) {
        throw e;
    }
    return client;
}

/**
 *
 * @param client {MongoClient}
 * @returns {import('mongodb').Db}
 */
function getDB(client) {
    const {env: {NODE_ENV}} = process;
    return client.db(NODE_ENV);
}

/**
 *
 * @param client {MongoClient}
 * @param collection {string} name of the collection
 * @returns {Collection<Document>}
 */
export function getCollection(client, collection) {
    const db = getDB(client);
    return db.collection(collection);
}