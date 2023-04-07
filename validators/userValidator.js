import { body, param } from 'express-validator';

export const getAllUsersValidator = [];

export const getUserByIdValidator = [param('id').isMongoId().withMessage('ID không hợp lệ')];

export const getUserByEmailValidator = [param('email').isEmail().withMessage('Email không hợp lệ')];

export const createUserValidator = [
    body('name').notEmpty().withMessage('Tên là bắt buộc'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 kí tự'),
];

export const updateUserValidator = [
    param('id').isMongoId().withMessage('ID không hợp lệ'),
    body('name').notEmpty().withMessage('Tên là bắt buộc'),
];

export const registerSellerValidator = [
    body('phone').notEmpty().withMessage('Số điện thoại là bắt buộc'),
    body('address').notEmpty().withMessage('Địa chỉ là bắt buộc'),
    body('description').notEmpty().withMessage('Mô tả nhà vườn là bắt buộc'),
    body('scale').notEmpty().withMessage('Quy mô là bắt buộc'),
    body('capicity').notEmpty().withMessage('Sản lượng là bắt buộc'),
];
