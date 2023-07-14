import mongoose from 'mongoose';

const quotationRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            require: true,
        },

        productName: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        unit: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const QuotationRequest = mongoose.model('quotation_requests', quotationRequestSchema);

export default QuotationRequest;
