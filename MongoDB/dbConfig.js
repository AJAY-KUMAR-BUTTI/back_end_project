const { MongoClient } = require('mongodb');

const dbName = 'BookMyShow';

async function initDB(collectionName) {
    let client = new MongoClient(process.env.MONGO_URL);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        console.log('successfully');
        return collection;
    } catch (err) {
        console.log('Error connection to DB');
    }
}


module.exports = {
    initDB
}