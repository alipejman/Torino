const mongoose = require('mongoose');

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/Torino');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

ConnectDB();