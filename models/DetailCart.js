import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carts',
            require: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            require: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model('detail-carts', cartSchema);

export default Cart;
