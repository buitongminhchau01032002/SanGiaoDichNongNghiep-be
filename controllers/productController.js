import ResError from '../utils/ResError.js';
import Product from '../models/Product.js';
import { update, upload } from '../utils/imageTookit.js';

// [GET] /products
export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate({ path: 'seller', select: '-password' }).populate('category');
        res.json(products);
    } catch (err) {
        next(err);
    }
};

// [GET] /products/:id
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({ path: 'seller', select: '-password' })
            .populate('category');
        if (!product) {
            throw new ResError(404, 'Không tìm thấy sản phẩm!');
        }
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

// [PUT] /products/:id
export const updateProduct = async (req, res, next) => {
    try {
        const objBody = req.body;

        const updateObj = {};
        Object.keys(objBody).forEach((key) => {
            if (key !== 'seller') {
                updateObj[key] = objBody[key];
            }
        });

        // upload image
        if (updateObj.image) {
            const imageResult = await upload(updateObj.image);
            updateObj.image = imageResult.image_url;
        }

        const product = await Product.findById(req.params.id);
        if (req.user._id.toString() !== product.seller.toString()) {
            throw new ResError(403, 'Cập nhật sản phẩm không thành công. Sản phẩm không thuộc về tài khoản này!');
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateObj, { new: true });

        if (!updatedProduct) {
            throw new ResError(401, 'Cập nhật sản phẩm không thành công!');
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

// [POST] /products
export const createProduct = async (req, res, next) => {
    try {
        const { name, category, price, unit, quantity, minPurchase, description, image } = req.body;

        // upload image
        let image_url;
        if (image) {
            const imageResult = await upload(image);
            image_url = imageResult.secure_url;
            console.log(imageResult);
        }
        const newProduct = new Product({
            name,
            category,
            price,
            unit,
            quantity,
            minPurchase,
            description,
            image: image ? image_url : undefined,
            seller: req.user._id.toString(),
        });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

// [DELETE] /products/:id
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (req.user._id.toString() !== product.seller.toString()) {
            throw new ResError(403, 'Xoá sản phẩm không thành công. Sản phẩm không thuộc về tài khoản này!');
        }
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            throw new ResError(401, 'Xoá sản phẩm không thành công!');
        }

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
