import ResError from '../utils/ResError.js';
import QuotationRequest from '../models/QuotationRequest.js';

// [GET] /quotation-requests
export const getQuotationRequests = async (req, res, next) => {
    try {
        const quotationRequests = await QuotationRequest.find()
            .populate({ path: 'user', select: '-password' })
            .populate('category');
        res.json(quotationRequests);
    } catch (err) {
        next(err);
    }
};

// [GET] /quotation-requests/of-user
export const getQuotationRequestsOfUser = async (req, res, next) => {
    try {
        const quotationRequests = await QuotationRequest.find({
            user: req.user._id,
        })
            .populate({ path: 'user', select: '-password' })
            .populate('category');
        res.json(quotationRequests);
    } catch (err) {
        next(err);
    }
};

// [GET] /quotation-requests/:id
export const getQuotationRequestById = async (req, res, next) => {
    try {
        const quotationRequest = await QuotationRequest.findById(req.params.id)
            .populate({ path: 'user', select: '-password' })
            .populate('category');
        if (!quotationRequest) {
            throw new ResError(404, 'Không tìm thấy yêu cầu báo giá!');
        }
        res.status(200).json(quotationRequest);
    } catch (err) {
        next(err);
    }
};

// [PUT] /quotation-requests/:id
export const updateQuotationRequest = async (req, res, next) => {
    try {
        const objBody = req.body;

        const updateObj = {};
        Object.keys(objBody).forEach((key) => {
            if (key !== 'user') {
                updateObj[key] = objBody[key];
            }
        });

        const quotationRequest = await QuotationRequest.findById(req.params.id);
        if (req.user._id.toString() !== quotationRequest.user.toString()) {
            throw new ResError(
                403,
                'Cập nhật yêu cầu báo giá không thành công. Yêu cầu báo giá không thuộc về tài khoản này!'
            );
        }

        const updatedQuotationRequest = await QuotationRequest.findByIdAndUpdate(req.params.id, updateObj, {
            new: true,
        });

        if (!updatedQuotationRequest) {
            throw new ResError(401, 'Cập nhật yêu cầu báo giá không thành công!');
        }

        res.status(200).json(updatedQuotationRequest);
    } catch (err) {
        next(err);
    }
};

// [POST] /quotationRequests
export const createQuotationRequest = async (req, res, next) => {
    try {
        const { category, productName, price, unit, quantity, description, startDate, endDate } = req.body;

        const newQuotationRequest = new QuotationRequest({
            category,
            productName,
            price,
            unit,
            quantity,
            description,
            startDate,
            endDate,
            user: req.user._id.toString(),
        });
        await newQuotationRequest.save();

        res.status(201).json(newQuotationRequest);
    } catch (error) {
        next(error);
    }
};

// [DELETE] /quotationRequests/:id
export const deleteQuotationRequest = async (req, res, next) => {
    try {
        const quotationRequest = await QuotationRequest.findById(req.params.id);
        if (req.user._id.toString() !== quotationRequest.user.toString()) {
            throw new ResError(
                403,
                'Xoá yêu cầu báo giá không thành công. Yêu cầu báo giá không thuộc về tài khoản này!'
            );
        }
        const deletedQuotationRequest = await QuotationRequest.findByIdAndDelete(req.params.id);
        if (!deletedQuotationRequest) {
            throw new ResError(401, 'Xoá yêu cầu báo giá không thành công!');
        }

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
