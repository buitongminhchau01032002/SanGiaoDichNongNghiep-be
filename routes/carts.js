import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import {
    addProduct,
    checkout,
    getCarts,
    getCurrentCart,
    removeProduct,
    updateProductQuantity,
} from '../controllers/cartController.js';
import {
    addProductCartValidator,
    removeProductCartValidator,
    updateQuantityCartValidator,
} from '../validators/cartValidator.js';
import validatorHandler from '../middlewares/validatorHandler.js';

const router = express.Router();

router.get('/current', isAuth, getCurrentCart);
router.get('/', isAuth, getCarts);
router.post('/add-product', isAuth, addProductCartValidator, validatorHandler, addProduct);
router.post('/remove-product/:id', isAuth, removeProductCartValidator, validatorHandler, removeProduct);
router.post('/update-quantity/:id', isAuth, updateQuantityCartValidator, validatorHandler, updateProductQuantity);
router.post('/checkout', isAuth, checkout);

export default router;
