import mongoose from "mongoose"
import moment from "moment";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum : ['Male', 'Female', 'Other'],
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    refresh_token: {
        type:  String,
        default: null
    }
}, {timestamps: true})


// hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// validate hashed password to normal password
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// generate JWT token
userSchema.methods.generateAccessToken = function(id, mobile) {
    return jwt.sign({ id: id, mobile: mobile }, process.env.JWT_ACCESS_KEY, { expiresIn: JWT_ACCESS_EXP });
};

// revoke both tokens
userSchema.methods.revokeJwt = async function() {
    const token = jwt.sign({ id: this._id, mobile: this.mobile }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_EXP });
    const refresh_token = jwt.sign({ id: this._id, mobile: this.mobile }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXP });

    this.refresh_token = refresh_token;
    await this.save();

    return { token, refresh_token };
};

// cast time in format while retrive data
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.createdAt = moment(user.createdAt).format('DD-MM-YYYY hh:mm:ss A');
    user.updatedAt = moment(user.updatedAt).format('DD-MM-YYYY hh:mm:ss A');

    return user;
};

export const User = mongoose.model('User', userSchema);
