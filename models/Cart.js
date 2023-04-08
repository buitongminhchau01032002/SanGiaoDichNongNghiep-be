import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true,
        },
        state: {
            type: String,
            required: true,
        },
        buyDate: {
            type: Date,
        },
        totalProduct: {
            type: Number,
        },
        totalPrice: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model('carts', cartSchema);

export default Cart;
