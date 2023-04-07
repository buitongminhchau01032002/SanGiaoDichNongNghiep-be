import ResError from '../utils/ResError.js';
import User from '../models/User.js';

// [GET] /users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

// [GET] /users/:id
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new ResError(404, 'Không tìm thấy tài khoản!');
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// [GET] /users/email/:email
export const getUserByEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            throw new ResError(404, 'Không tìm thấy tài khoản!');
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// [PUT] /users
export const updateUser = async (req, res) => {
    try {
        const objBody = req.body;
        const updateObj = {};
        Object.keys(objBody).forEach((key) => {
            if (key !== 'password' && key !== 'email' && key !== 'isSeller') {
                updateObj[key] = objBody[key];
            }
        });
        const updatedUser = await User.findByIdAndUpdate(req.user._id, updateObj, { new: true });

        if (!updatedUser) {
            throw new ResError(401, 'Cập nhật tài khoản không thành công!');
        }

        const resUser = updatedUser.toObject();
        delete resUser.password;

        res.status(200).json(resUser);
    } catch (error) {
        next(err);
    }
};

// [POST] /users/register-seller
export const registerSeller = async (req, res, next) => {
    try {
        const { phone, address, imageSeller, brandName, description, scale, capicity } = req.body;
        if (req.user.isSeller) {
            throw new ResError(401, 'Tài khoản này đã là nhà cung cấp!');
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                isSeller: true,
                phone,
                address,
                brandName,
                description,
                scale,
                capicity,
            },
            { new: true }
        );

        if (!updatedUser) {
            throw new ResError(401, 'Đăng ký không thành công!');
        }

        const resUser = updatedUser.toObject();
        delete resUser.password;

        res.status(200).json(resUser);
    } catch (err) {
        next(err);
    }
};
