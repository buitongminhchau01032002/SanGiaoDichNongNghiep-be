import ResError from '../utils/ResError.js';
import Quotation from '../models/Quotation.js';

// [GET] /quotations
export const getQuotations = async (req, res, next) => {
    try {
        const quotations = await Quotation.find()
            .populate({ path: 'seller', select: '-password' })
            .populate({
                path: 'request',
                populate: {
                    path: 'user',
                    select: '-password',
                    model: 'users',
                },
            });
        res.json(quotations);
    } catch (err) {
        next(err);
    }
};

// [GET] /quotations/:id
export const getQuotationById = async (req, res, next) => {
    try {
        const quotation = await Quotation.findById(req.params.id)
            .populate({ path: 'seller', select: '-password' })
            .populate({
                path: 'request',
                populate: {
                    path: 'user',
                    select: '-password',
                    model: 'users',
                },
            });
        if (!quotation) {
            throw new ResError(404, 'Không tìm thấy báo giá!');
        }
        res.status(200).json(quotation);
    } catch (err) {
        next(err);
    }
};

// [GET] /quotations/of-user
export const getQuotationsOfUser = async (req, res, next) => {
    try {
        const quotations = await Quotation.find({
            seller: req.user._id,
        })
            .populate({ path: 'seller', select: '-password' })
            .populate({
                path: 'request',
                populate: {
                    path: 'user',
                    select: '-password',
                    model: 'users',
                },
            });
        res.json(quotations);
    } catch (err) {
        next(err);
    }
};

// [GET] /quotations/of-request/:id
export const getQuotationsOfRequest = async (req, res, next) => {
    try {
        const quotations = await Quotation.find({
            request: req.params.id,
        })
            .populate({ path: 'seller', select: '-password' })
            .populate({
                path: 'request',
                populate: {
                    path: 'user',
                    select: '-password',
                    model: 'users',
                },
            });
        res.json(quotations);
    } catch (err) {
        next(err);
    }
};

// [PUT] /quotations/:id
export const updateQuotation = async (req, res, next) => {
    try {
        const objBody = req.body;

        const updateObj = {};
        Object.keys(objBody).forEach((key) => {
            if (key !== 'seller' && key !== 'request') {
                updateObj[key] = objBody[key];
            }
        });

        const quotation = await Quotation.findById(req.params.id);
        if (!quotation) {
            throw new ResError(403, 'Không tìm thấy báo giá!');
        }
        if (req.user._id.toString() !== quotation.seller.toString()) {
            throw new ResError(403, 'Cập nhật báo giá không thành công. Báo giá không thuộc về tài khoản này!');
        }

        const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, updateObj, {
            new: true,
        });

        if (!updatedQuotation) {
            throw new ResError(401, 'Cập nhật báo giá không thành công!');
        }

        res.status(200).json(updatedQuotation);
    } catch (err) {
        next(err);
    }
};

// [POST] /quotations/update-state/:id
export const updateQuotationState = async (req, res, next) => {
    try {
        const { state } = req.body;

        const quotation = await Quotation.findById(req.params.id).populate('request');
        if (!quotation) {
            throw new ResError(403, 'Không tìm thấy báo giá!');
        }
        if (req.user._id.toString() !== quotation.toObject().request.user.toString()) {
            throw new ResError(
                403,
                'Cập nhật trạng thái báo giá không thành công. Yêu cầu báo giá không thuộc về tài khoản!'
            );
        }

        const updatedQuotation = await Quotation.findByIdAndUpdate(
            req.params.id,
            { state },
            {
                new: true,
            }
        );

        if (!updatedQuotation) {
            throw new ResError(401, 'Cập nhật trạng thái báo giá không thành công!');
        }

        res.status(200).json(updatedQuotation);
    } catch (err) {
        next(err);
    }
};

// [POST] /quotations
export const createQuotation = async (req, res, next) => {
    try {
        const { request, price, description } = req.body;

        const newQuotation = new Quotation({
            request,
            price,
            description,
            seller: req.user._id.toString(),
            state: 'pending',
        });
        await newQuotation.save();

        res.status(201).json(newQuotation);
    } catch (error) {
        next(error);
    }
};

// [DELETE] /quotations/:id
export const deleteQuotation = async (req, res, next) => {
    try {
        const quotation = await Quotation.findById(req.params.id);
        if (!quotation) {
            throw new ResError(403, 'Không tìm thấy báo giá!');
        }
        if (req.user._id.toString() !== quotation.seller.toString()) {
            throw new ResError(403, 'Xoá báo giá không thành công. Báo giá không thuộc về tài khoản này!');
        }
        const deletedQuotation = await Quotation.findByIdAndDelete(req.params.id);
        if (!deletedQuotation) {
            throw new ResError(401, 'Xoá báo giá không thành công!');
        }

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
