import express from 'express';
import { createUser, getUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';

const router = express.Router();


router.post('/', authMiddleware, roleMiddleware('admin'), createUser);


router.get('/:userId', authMiddleware, getUser);

export default router;
