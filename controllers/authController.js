import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import ResError from '../utils/ResError.js';

// [POST] auth/register
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ResError(400, 'Email đã tồn tại trong hệ thống!');
        }

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

        const resUser = newUser.toObject();
        delete resUser.password;

        res.status(201).json({ ...resUser, token });
    } catch (error) {
        next(error);
    }
};

// [POST] auth/login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new ResError(401, 'Email hoặc mật khẩu không chính xác');
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ResError(401, 'Email hoặc mật khẩu không chính xác');
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        const resUser = user.toObject();
        delete resUser.password;
        res.status(200).json({
            ...resUser,
            token,
        });
    } catch (error) {
        next(error);
    }
};
