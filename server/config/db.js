import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'

let _db;


dotenv.config();

export const connectDb = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();
        _db = client.db();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Could not connect to MongoDB');
    }
};

export const getDb = () => {
    if (!_db) {
        throw new Error('Database not initialized!');
    }
    return _db;
};
