import express from 'express';
import userRoutes from './users.js';
import authRoutes from './auth.js';
import categoriesRoutes from './categories.js';
import productsRoutes from './products.js';
import commentsRoutes from './comments.js';

const router = express.Router();
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/comments', commentsRoutes);

export default router;
