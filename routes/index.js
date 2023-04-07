import express from 'express';
import userRoutes from './users.js';
import authRoutes from './auth.js';
import categoriesRoutes from './categories.js';

const router = express.Router();
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);

export default router;
