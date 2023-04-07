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
