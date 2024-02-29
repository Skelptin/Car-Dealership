import { addUser, getUserById } from '../models/user.model.js';

export const createUser = async (req, res, next) => {
    try {
        const userId = await addUser(req.body);
        res.status(201).json({ message: 'User created', userId });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
};