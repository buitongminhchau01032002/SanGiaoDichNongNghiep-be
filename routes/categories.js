import express from 'express';
import { createCategory, getCategories, getCategoryById } from '../controllers/categoryController.js';
import { createCategoryValidator, getCategoryByIdValidator } from '../validators/categoryValidator.js';
import validatorHandler from '../middlewares/validatorHandler.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryByIdValidator, validatorHandler, getCategoryById);
router.post('/', createCategoryValidator, validatorHandler, createCategory);

export default router;
