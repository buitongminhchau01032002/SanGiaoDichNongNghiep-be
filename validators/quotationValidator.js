import { body, param } from 'express-validator';

export const getQuotationByIdValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];
export const getQuotationsByRequestValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];
export const deleteQuotationByIdValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];

export const createQuotationValidator = [
    body('request')
        .notEmpty()
        .withMessage('Yêu cầu báo giá là bắt buộc!')
        .isMongoId()
        .withMessage('Yêu cầu báo giá không đúng!'),
    body('price').notEmpty().withMessage('Giá là bắt buộc!').isInt().withMessage('Giá phải là số!'),
    body('quantity').notEmpty().withMessage('Số lượng là bắt buộc!').isInt().withMessage('Số lượng phải là số!'),
];

export const updateQuotationValidator = [
    param('id').isMongoId().withMessage('ID không hợp lệ'),
    body('price').optional().notEmpty().withMessage('Giá là bắt buộc!').isInt().withMessage('Giá phải là số!'),
    body('quantity')
        .optional()
        .notEmpty()
        .withMessage('Số lượng là bắt buộc!')
        .isInt()
        .withMessage('Số lượng phải là số!'),
];

export const updateQuotationStateValidator = [
    param('id').isMongoId().withMessage('ID không hợp lệ'),
    body('state').isIn(['confirm', 'abort']).withMessage('Trạng thái báo giá không hợp lệ!'),
];
