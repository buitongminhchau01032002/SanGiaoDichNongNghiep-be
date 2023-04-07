import express from 'express';
import { loginValidator, registerValidator } from '../validators/authValidator.js';
import validatorHandler from '../middlewares/validatorHandler.js';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerValidator, validatorHandler, register);
router.post('/login', loginValidator, validatorHandler, login);

export default router;
