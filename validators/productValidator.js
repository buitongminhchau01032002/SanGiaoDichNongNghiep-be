import { body, param } from 'express-validator';

export const getProductByIdValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];
export const deleteProductByIdValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];

export const createProductValidator = [
    body('name').notEmpty().withMessage('Tên sản phẩm là bắt buộc'),
    body('category').notEmpty().withMessage('Danh mục là bắt buộc!').isMongoId().withMessage('Danh mục không đúng!'),
    body('price').notEmpty().withMessage('Giá là bắt buộc!').isInt().withMessage('Giá phải là số!'),
    body('unit').notEmpty().withMessage('Đơn vị là bắt buộc!'),
    body('quantity').notEmpty().withMessage('Số lượng là bắt buộc!').isInt().withMessage('Số lượng phải là số!'),
    body('minPurchase')
        .notEmpty()
        .withMessage('Số lượng mua tối thiểu là bắt buộc!')
        .isInt()
        .withMessage('Số lượng mua tối thiểu phải là số!'),
    body('description').notEmpty().withMessage('Mô tả là bắt buộc!'),
];

export const updateProductValidator = [
    param('id').isMongoId().withMessage('ID không hợp lệ'),
    body('name').optional().notEmpty().withMessage('Tên sản phẩm là bắt buộc'),
    body('category')
        .optional()
        .notEmpty()
        .withMessage('Danh mục là bắt buộc!')
        .isMongoId()
        .withMessage('Danh mục không đúng!'),
    body('price').optional().notEmpty().withMessage('Giá là bắt buộc!').isInt().withMessage('Giá phải là số!'),
    body('unit').optional().notEmpty().withMessage('Đơn vị là bắt buộc!'),
    body('quantity')
        .optional()
        .notEmpty()
        .withMessage('Số lượng là bắt buộc!')
        .isInt()
        .withMessage('Số lượng phải là số!'),
    body('minPurchase')
        .optional()
        .notEmpty()
        .withMessage('Số lượng mua tối thiểu là bắt buộc!')
        .isInt()
        .withMessage('Số lượng mua tối thiểu phải là số!'),
    body('description').optional().notEmpty().withMessage('Mô tả là bắt buộc!'),
];
