const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB)
        console.log(`MongoDB conectado exitosamente OK! ${conn.connection.host}` )

    } catch (error) {      
       console.error(`Error: ${error.message}`);
    }
}

module.exports = connectDB;