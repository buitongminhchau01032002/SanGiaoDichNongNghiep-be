import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from '../controllers/productController.js';
import {
    createProductValidator,
    deleteProductByIdValidator,
    getProductByIdValidator,
    updateProductValidator,
} from '../validators/productValidator.js';
import validatorHandler from '../middlewares/validatorHandler.js';
import isAuth from '../middlewares/isAuth.js';
import isSeller from '../middlewares/isSeller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductByIdValidator, validatorHandler, getProductById);
router.post('/', isAuth, isSeller, createProductValidator, validatorHandler, createProduct);
router.put('/:id', isAuth, isSeller, updateProductValidator, validatorHandler, updateProduct);
router.delete('/:id', isAuth, isSeller, deleteProductByIdValidator, validatorHandler, deleteProduct);

export default router;
