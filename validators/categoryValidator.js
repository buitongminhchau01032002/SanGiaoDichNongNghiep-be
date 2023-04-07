import { body, param } from 'express-validator';

export const getCategoryByIdValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];

export const createCategoryValidator = [body('name').notEmpty().withMessage('Tên danh mục là bắt buộc')];
