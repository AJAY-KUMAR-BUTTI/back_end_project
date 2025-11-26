const mongoose = require('mongoose');

async function initDB() {
    try {
        // console.log(process.env.MONGO_URL, "url")
        await mongoose.connect(process.env.MONGO_URL, { dbName : 'sample_mflix' });
        console.log("connected to DB successfully");
    } catch (err) {
        console.log("Error connected to DB");
        process.exit();
    }
}

module.exports = {
    initDB
}