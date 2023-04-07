import { body, param } from 'express-validator';

export const getCommentByIdValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];
// export const deleteCommentByIdValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];

export const createCommentValidator = [
    body('product').notEmpty().withMessage('Sản phẩm là bắt buộc!').isMongoId().withMessage('Sản phẩm không đúng!'),
    body('content').notEmpty().withMessage('Nội dung là bắt buộc!'),
];

export const getCommentsInProductValidator = [param('id').isMongoId().withMessage('ID không hợp lệ!')];
