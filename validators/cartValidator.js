import { body, param } from 'express-validator';

export const addProductCartValidator = [
    body('product').notEmpty().withMessage('Sản phẩm là bắt buộc'),
    body('quantity').notEmpty().withMessage('Số lượng là bắt buộc').isInt().withMessage('Số lượng phải là số'),
];

export const removeProductCartValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];

export const updateQuantityCartValidator = [
    param('id').isMongoId().withMessage('ID không hợp lệ'),
    body('quantity').notEmpty().withMessage('Số lượng là bắt buộc').isInt().withMessage('Số lượng phải là số'),
];
