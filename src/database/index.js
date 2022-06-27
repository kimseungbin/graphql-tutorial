import {MongoClient} from "mongodb";

export default async function connectDB(uri) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db('admin').command({ ping: 1})
        if (process.env.NODE_ENV === 'development') {
            console.log('Database connected successfully to server')
        }
    } catch (e) {
        throw e
    }
    return client
}