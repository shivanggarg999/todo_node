import mongoose from "mongoose"
import moment from "moment";

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
    }
}, {timestamps: true})

// cast time in format
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.createdAt = moment(user.createdAt).format('DD-MM-YYYY hh:mm:ss A');
    user.updatedAt = moment(user.updatedAt).format('DD-MM-YYYY hh:mm:ss A');
    return user;
};

export const User = mongoose.model('User', userSchema);
