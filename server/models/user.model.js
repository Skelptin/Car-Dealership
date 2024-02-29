// user.model.js

import { getDb } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const addUser = async (userData) => {
    const db = getDb();
    try {
        const result = await db.collection('users').insertOne(userData);
        return result.insertedId;
    } catch (error) {
        throw new Error('Could not add user');
    }
};

export const getUserById = async (userId) => {
    const db = getDb();
    try {
        const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
        return user;
    } catch (error) {
        throw new Error('Could not find user');
    }
};

export const getUserByEmail = async (email) => {
    const db = getDb();
    try {
        const validEmail = await db.collection('users').findOne({ email });
        return validEmail;
    } catch (error) {
        throw new Error('Could not find this user please sign up');
    }
};
