import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isSeller: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        imageSeller: {
            type: String,
        },
        brandName: {
            type: String,
        },
        scale: {
            type: String,
        },
        capicity: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('users', userSchema);

export default User;
