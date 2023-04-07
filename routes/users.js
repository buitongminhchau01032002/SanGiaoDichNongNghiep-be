import express from 'express';
import { getUserByEmailValidator, getUserByIdValidator } from '../validators/userValidator.js';
import { getUserByEmail, getUserById, getUsers } from '../controllers/userController.js';
import validatorHandler from '../middlewares/validatorHandler.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserByIdValidator, validatorHandler, getUserById);
router.get('/email/:email', getUserByEmailValidator, validatorHandler, getUserByEmail);

export default router;
