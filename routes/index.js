import express from 'express';
import userRoutes from './users.js';
import authRoutes from './auth.js';

const router = express.Router();
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
