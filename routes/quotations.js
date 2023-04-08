import express from 'express';
import {
    createQuotation,
    deleteQuotation,
    getQuotationById,
    getQuotations,
    getQuotationsOfRequest,
    getQuotationsOfUser,
    updateQuotation,
    updateQuotationState,
} from '../controllers/quotationController.js';
import {
    createQuotationValidator,
    deleteQuotationByIdValidator,
    getQuotationByIdValidator,
    getQuotationsByRequestValidator,
    updateQuotationStateValidator,
    updateQuotationValidator,
} from '../validators/quotationValidator.js';
import validatorHandler from '../middlewares/validatorHandler.js';
import isAuth from '../middlewares/isAuth.js';
import isSeller from '../middlewares/isSeller.js';

const router = express.Router();

router.get('/of-seller', isAuth, isSeller, getQuotationsOfUser);
router.get('/of-request/:id', getQuotationsByRequestValidator, validatorHandler, getQuotationsOfRequest);
router.get('/:id', getQuotationByIdValidator, validatorHandler, getQuotationById);
router.get('/', getQuotations);
router.post('/update-state/:id', isAuth, updateQuotationStateValidator, validatorHandler, updateQuotationState);
router.post('/', isAuth, isSeller, createQuotationValidator, validatorHandler, createQuotation);
router.put('/:id', isAuth, isSeller, updateQuotationValidator, validatorHandler, updateQuotation);
router.delete('/:id', isAuth, isSeller, deleteQuotationByIdValidator, validatorHandler, deleteQuotation);

export default router;
