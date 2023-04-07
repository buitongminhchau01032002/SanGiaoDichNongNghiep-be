import express from 'express';
import {
    createQuotationRequest,
    deleteQuotationRequest,
    getQuotationRequestById,
    getQuotationRequests,
    getQuotationRequestsOfUser,
    updateQuotationRequest,
} from '../controllers/quotationRequestController.js';
import {
    createQuotationRequestValidator,
    deleteQuotationRequestByIdValidator,
    getQuotationRequestByIdValidator,
    updateQuotationRequestValidator,
} from '../validators/quotationRequestValidator.js';
import validatorHandler from '../middlewares/validatorHandler.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

router.get('/', getQuotationRequests);
router.get('/of-user', isAuth, getQuotationRequestsOfUser);
router.get('/:id', getQuotationRequestByIdValidator, validatorHandler, getQuotationRequestById);
router.post('/', isAuth, createQuotationRequestValidator, validatorHandler, createQuotationRequest);
router.put('/:id', isAuth, updateQuotationRequestValidator, validatorHandler, updateQuotationRequest);
router.delete('/:id', isAuth, deleteQuotationRequestByIdValidator, validatorHandler, deleteQuotationRequest);

export default router;
