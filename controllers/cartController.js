import ResError from '../utils/ResError.js';
import Cart from '../models/Cart.js';
import DetailCart from '../models/DetailCart.js';

// [GET] /cart
export const getCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find({
            user: req.user._id.toString(),
            state: 'bought',
        });
        res.json(carts);
    } catch (err) {
        next(err);
    }
};

const getDetails = async (cart) => {
    try {
        const details = await DetailCart.find({ cart: cart._id }).populate('product');
        if (!details) {
            throw new Error();
        }
        return details;
    } catch (error) {
        throw new Error();
    }
};

// [GET] /carts/current
export const getCurrentCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id.toString(), state: 'pending' });
        if (!cart) {
            cart = new Cart({
                state: 'pending',
                user: req.user._id.toString(),
            });
            await cart.save();
        }
        const details = await getDetails(cart.toObject());
        cart = cart.toObject();
        cart.details = details;
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
};

// [POST] /carts/add-product
export const addProduct = async (req, res, next) => {
    try {
        const { product, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user._id.toString(), state: 'pending' }).populate('user');
        if (!cart) {
            cart = new Cart({
                state: 'pending',
                user: req.user._id.toString(),
            });
            await cart.save();
        }

        const detailCart = new DetailCart({
            product,
            quantity,
            cart: cart._id.toString(),
        });
        await detailCart.save();

        res.status(200).json(detailCart);
    } catch (error) {
        next(error);
    }
};

// [POST] /carts/remove-product/:id
export const removeProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        let cart = await Cart.findOne({ user: req.user._id.toString(), state: 'pending' }).populate('user');
        if (!cart) {
            cart = new Cart({
                state: 'pending',
                user: req.user._id.toString(),
            });
            await cart.save();
            throw new ResError(401, 'Giỏ hàng trống, không thể xoá sản phẩm!');
        }

        const detailCart = await DetailCart.findById(id);
        if (!detailCart) {
            throw new ResError(401, 'Sản phẩm không tồn tại trong giỏ hàng');
        }

        if (cart._id.toString() !== detailCart.cart.toString()) {
            throw new ResError(401, 'Không xác thực được giỏ hàng');
        }

        await DetailCart.findByIdAndDelete(id);

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

// [POST] /carts/update-quantity/:id
export const updateProductQuantity = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params;
        let cart = await Cart.findOne({ user: req.user._id.toString(), state: 'pending' }).populate('user');
        if (!cart) {
            cart = new Cart({
                state: 'pending',
                user: req.user._id.toString(),
            });
            await cart.save();
            throw new ResError(401, 'Không thể xác thực giỏ hàng!');
        }

        const detailCart = await DetailCart.findById(id);
        if (!detailCart) {
            throw new ResError(401, 'Sản phẩm không tồn tại trong giỏ hàng');
        }

        if (cart._id.toString() !== detailCart.cart.toString()) {
            throw new ResError(401, 'Không xác thực được giỏ hàng');
        }

        const newDetailProduct = await DetailCart.findByIdAndUpdate(id, { quantity }, { new: true });

        if (!newDetailProduct) {
            throw new ResError(401, 'Không có sản phẩm trong giỏ hàng!');
        }

        res.status(200).json(newDetailProduct);
    } catch (error) {
        next(error);
    }
};

// [POST] /carts/checkout
export const checkout = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id.toString(), state: 'pending' }).populate('user');
        if (!cart) {
            cart = new Cart({
                state: 'pending',
                user: req.user._id.toString(),
            });
            await cart.save();
            throw new ResError(401, 'Giỏ hàng trống, không thể thanh toán!');
        }
        const detailCart = await getDetails(cart);

        if (detailCart.length === 0) {
            throw new ResError(401, 'Giỏ hàng trống, không thể thanh toán!');
        }

        // calc total price
        let totalPrice = 0;
        detailCart.forEach(({ product, quantity }) => {
            totalPrice += quantity * product.price;
        });

        await Cart.findByIdAndUpdate(cart.id, {
            totalPrice,
            totalProduct: detailCart.length,
            state: 'bought',
            $currentDate: { buyDate: true },
        });

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
