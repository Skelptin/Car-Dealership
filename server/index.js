// src/app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import carRoutes from './routes/car.route.js';
import dealershipRoutes from './routes/dealership.route.js';
import userRoutes from './routes/user.route.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import path from 'path'

dotenv.config();
connectDb();

const app = express();

const __dirname = path.resolve();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/dealerships', dealershipRoutes);
app.use('/api/users', userRoutes);


app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
    res.send(path.join(__dirname, '../client', 'dist', 'index.html'))
})

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
