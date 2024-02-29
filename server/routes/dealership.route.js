// src/routes/dealershipRoutes.js

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';
import { addDeal, addCarToDealership, getDealershipCars, getDealershipDeals } from '../controllers/dealership.controller.js';

const router = express.Router();

// Add a deal to a dealership (Accessible by dealership)
router.post('/deal', authMiddleware, roleMiddleware('dealership'), addDeal);

// Add a car to a dealership (Accessible by dealership)
router.post('/car', authMiddleware, roleMiddleware('dealership'), addCarToDealership);

// Get all cars of a dealership (Accessible by dealership)
router.get('/cars', authMiddleware, roleMiddleware('dealership'), getDealershipCars);

// Get all deals of a dealership (Accessible by dealership)
router.get('/deals', authMiddleware, roleMiddleware('dealership'), getDealershipDeals);

export default router;
