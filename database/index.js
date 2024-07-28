
var mongoose = require("mongoose");
const { mongoUri } = require('../config/index')

class Database {
    static db = {};
    static connects = async () => {
        try {
            const conn = await mongoose.connect(mongoUri);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
        } catch (err) {
            console.log(`Error: ${err.message}`)
            process.exit(1) //Exit with failure.
        }
    }
}

module.exports = Database;