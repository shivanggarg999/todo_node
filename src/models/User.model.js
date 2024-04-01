import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum : ['Male', 'Female', 'Other'],
        default: 'Pending'
    }
}, {timestamps: true})

export const User = mongoose.model('User', userSchema);
