import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true,
        },
        request: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quotation_requests',
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        description: {
            type: String,
        },
        state: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Quotation = mongoose.model('quotations', quotationSchema);

export default Quotation;
