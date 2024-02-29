
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { addUser, getUserByEmail } from '../models/user.model.js';

const router = express.Router();


export const register = async (req, res, next) => {
  try {
    const { username, password, email, role ,location } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await addUser({ email, username, password: hashedPassword, role,location });
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const { password: _, ...userData } = user;

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: userData }); // Send user data without the password
  } catch (error) {
    next(error);
  }
}


export default router;
