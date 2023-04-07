import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import ResError from '../utils/ResError.js';

const isAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded });
        if (!user) {
            throw new ResError(401, 'Không xác thực được tài khoản');
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        return next(new ResError(401, 'Không xác thực được tài khoản'));
    }
};

export default isAuth;
