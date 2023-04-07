import express from 'express';
import { getUserByEmailValidator, getUserByIdValidator, registerSellerValidator } from '../validators/userValidator.js';
import { getUserByEmail, getUserById, getUsers, registerSeller, updateUser } from '../controllers/userController.js';
import validatorHandler from '../middlewares/validatorHandler.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserByIdValidator, validatorHandler, getUserById);
router.get('/email/:email', getUserByEmailValidator, validatorHandler, getUserByEmail);
router.post('/register-seller', isAuth, registerSellerValidator, validatorHandler, registerSeller);
router.put('/', isAuth, updateUser);

export default router;
