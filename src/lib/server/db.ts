import {MongoClient} from 'mongodb';

const client = new MongoClient('mongodb+srv://imt:imt@japan-cluster.fm0xrvo.mongodb.net');
const dbName = 'split';

let db: any;

export async function connect() {
    if (db) return db;
    await client.connect();
    db = client.db(dbName);
    return db;
}

export async function getCollection(collectionName: string) {
    const database = await connect();
    return database.collection(collectionName);
}

export async function createCollection(collectionName: string) {
}