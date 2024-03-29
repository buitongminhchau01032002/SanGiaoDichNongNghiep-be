import { body, param } from 'express-validator';

export const getQuotationRequestByIdValidator = [
    param('id').isMongoId().withMessage('ID không hợp lệ'),
];
export const deleteQuotationRequestByIdValidator = [
    param('id').isMongoId().withMessage('ID không hợp lệ'),
];

export const createQuotationRequestValidator = [
    body('productName').notEmpty().withMessage('Tên sản phẩm là bắt buộc'),
    body('category')
        .notEmpty()
        .withMessage('Danh mục là bắt buộc!')
        .isMongoId()
        .withMessage('Danh mục không đúng!'),
    body('price').notEmpty().withMessage('Giá là bắt buộc!').isInt().withMessage('Giá phải là số!'),
    body('unit').notEmpty().withMessage('Đơn vị là bắt buộc!'),
    body('quantity')
        .notEmpty()
        .withMessage('Số lượng là bắt buộc!')
        .isInt()
        .withMessage('Số lượng phải là số!'),
];

export const updateQuotationRequestValidator = [
    body('productName').optional().notEmpty().withMessage('Tên sản phẩm là bắt buộc'),
    body('category')
        .optional()
        .notEmpty()
        .withMessage('Danh mục là bắt buộc!')
        .isMongoId()
        .withMessage('Danh mục không đúng!'),
    body('price')
        .optional()
        .notEmpty()
        .withMessage('Giá là bắt buộc!')
        .isInt()
        .withMessage('Giá phải là số!'),
    body('unit').optional().notEmpty().withMessage('Đơn vị là bắt buộc!'),
    body('quantity')
        .optional()
        .notEmpty()
        .withMessage('Số lượng là bắt buộc!')
        .isInt()
        .withMessage('Số lượng phải là số!'),
];
