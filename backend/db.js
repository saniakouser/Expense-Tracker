const mongoose = require("mongoose");

async function ConnectDB() {
    try {
        const connectionInstance = await mongoose.connect("mongodb://127.0.0.1:27017/Tracker");
        console.log(`MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

module.exports = ConnectDB;
