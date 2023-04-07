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
        startDate: {
            type: Date,
            require: true,
            validate: {
                validator: function (value) {
                    return value < this.endDate;
                },
                message: 'Ngày bắt đầu phải trước ngày kết thúc!',
            },
        },
        endDate: {
            type: Date,
            require: true,
        },
    },
    { timestamps: true }
);

const QuotationRequest = mongoose.model('quotation_requests', quotationRequestSchema);

export default QuotationRequest;
