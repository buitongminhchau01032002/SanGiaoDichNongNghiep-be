import express from 'express';
import userRoutes from './users.js';
import authRoutes from './auth.js';
import categoriesRoutes from './categories.js';
import productsRoutes from './products.js';
import commentsRoutes from './comments.js';
import quotationsRoutes from './quotations.js';
import quotationRequestsRoutes from './quotation-requests.js';

const router = express.Router();
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/comments', commentsRoutes);
router.use('/quotations', quotationsRoutes);
router.use('/quotation-requests', quotationRequestsRoutes);

export default router;
