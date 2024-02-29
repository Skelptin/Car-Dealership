// carRoutes.js

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { addCarToSell, getCars, getAllCars, editCarDetails, deleteCar } from '../controllers/car.controller.js';

const router = express.Router();

router.post('/', authMiddleware, addCarToSell);
router.get('/getallcars', authMiddleware, getAllCars);
router.get('/:dealerId', authMiddleware, getCars);
router.put('/edit/:carId', authMiddleware, editCarDetails);
router.delete('/delete/:carId', authMiddleware, deleteCar);

export default router;
