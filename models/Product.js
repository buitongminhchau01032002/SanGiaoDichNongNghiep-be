import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            require: true,
        },

        price: {
            type: Number,
            require: true,
        },
        unit: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        minPurchase: {
            type: Number,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('products', productSchema);

export default Product;
