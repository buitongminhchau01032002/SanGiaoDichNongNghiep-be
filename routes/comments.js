import express from 'express';
import { createComment, getCommentById, getComments, getCommentsInProduct } from '../controllers/commentController.js';
import {
    createCommentValidator,
    getCommentByIdValidator,
    getCommentsInProductValidator,
} from '../validators/commentValidator.js';
import validatorHandler from '../middlewares/validatorHandler.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

router.get('/', getComments);
router.get('/product/:id', getCommentsInProductValidator, validatorHandler, getCommentsInProduct);
router.get('/:id', getCommentByIdValidator, validatorHandler, getCommentById);
router.post('/', isAuth, createCommentValidator, validatorHandler, createComment);

export default router;
