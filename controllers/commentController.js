import ResError from '../utils/ResError.js';
import Comment from '../models/Comment.js';

// [GET] /comments
export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find().populate({ path: 'user', select: '-password' }).populate('product');
        res.json(comments);
    } catch (err) {
        next(err);
    }
};

// [GET] /comments/product/:id
export const getCommentsInProduct = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const comments = await Comment.find({
            'product._id': id,
        })
            .populate({ path: 'user', select: '-password' })
            .populate('product');
        res.json(comments);
    } catch (err) {
        next(err);
    }
};

// [GET] /comments/:id
export const getCommentById = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate({ path: 'user', select: '-password' })
            .populate('product');
        if (!comment) {
            throw new ResError(404, 'Không tìm thấy comment!');
        }
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
};

// [PUT] /comments/:id
// export const updateComment = async (req, res, next) => {
//     try {
//         const objBody = req.body;

//         const updateObj = {};
//         Object.keys(objBody).forEach((key) => {
//             if (key !== 'seller') {
//                 updateObj[key] = objBody[key];
//             }
//         });

//         const comment = await Comment.findById(req.params.id);
//         if (req.user._id.toString() !== comment.seller.toString()) {
//             throw new ResError(403, 'Cập nhật sản phẩm không thành công. Sản phẩm không thuộc về tài khoản này!');
//         }

//         const updatedComment = await Comment.findByIdAndUpdate(req.params.id, updateObj, { new: true });

//         if (!updatedComment) {
//             throw new ResError(401, 'Cập nhật sản phẩm không thành công!');
//         }

//         res.status(200).json(updatedComment);
//     } catch (err) {
//         next(err);
//     }
// };

// [POST] /comments
export const createComment = async (req, res, next) => {
    try {
        const { product, content } = req.body;
        const newComment = new Comment({
            product,
            user: req.user._id.toString(),
            content,
        });
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

// [DELETE] /comments/:id
// export const deleteComment = async (req, res, next) => {
//     try {
//         const comment = await Comment.findById(req.params.id);
//         if (req.user._id.toString() !== comment.seller.toString()) {
//             throw new ResError(403, 'Xoá sản phẩm không thành công. Sản phẩm không thuộc về tài khoản này!');
//         }
//         const deletedComment = await Comment.findByIdAndDelete(req.params.id);
//         if (!deletedComment) {
//             throw new ResError(401, 'Xoá sản phẩm không thành công!');
//         }

//         res.status(200).json({ success: true });
//     } catch (error) {
//         next(error);
//     }
// };
