import ResError from '../utils/ResError.js';

const isSeller = async (req, res, next) => {
    try {
        if (!req.user?.isSeller) {
            throw new ResError(401, 'Không xác thực được nhà cung cấp');
        }
        next();
    } catch (error) {
        console.log(error);
        return next(new ResError(401, 'Không xác thực được nhà cung cấp'));
    }
};

export default isSeller;
