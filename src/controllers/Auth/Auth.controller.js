import { User } from "../../models/User.model.js";
import Joi from 'joi';
import jwt from "jsonwebtoken";



// register validation rules and function
const registerUserRules = Joi.object({
    full_name: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    mobile: Joi.string().length(10).regex(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Mobile number must be a 10-digit number',
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Confirm password must match password',
    })
});
export const register = async (req, res) => {
    const reqData = req.body;
    const { error } = registerUserRules.validate(reqData);
    if (!error) {
        try {
            await User.create({
                full_name: reqData.full_name.toLowerCase(),
                gender: reqData.gender,
                mobile: reqData.mobile,
                email: reqData.email,
                password: reqData.password
            });

            res.status(201).json({status: 1, message: 'user registered Successfully'});
        } catch (error) {
            if (error.code == 11000) {
                let error_key = error.keyPattern.email ? 'email' : 'mobile'
                res.status(409).json({status: 0, message: `${error_key} already exist`});
            } else {
                res.status(500).json({status: 0, message: 'Something went wrong !'});
            }
        }
    } else {
        return res.status(400).json({status_code: 2, message: error.details[0].message.replace(/"/g, '')});
    }
}


// login validation rules and function
const loginUserRules = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
export const login = async (req, res) => {
    const reqData = req.body;
    const { error } = loginUserRules.validate(reqData);

    if (!error) {
        const user = await User.findOne({
            $or: [
                { email: reqData.username },
                { mobile: reqData.username }
            ]
        });

        if(user){
            const result = await user.validatePassword(reqData.password);

            if(result){
                const { token, refresh_token } = await user.revokeJwt();

                res.cookie('token', token, { httpOnly: true, secure: true });
                res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: true });
                return res.status(200).json({status_code: 1, message: `Login successfull`, token: token, refresh_token: refresh_token});
            } else {
                return res.status(401).json({status_code: 0, message: `invalid login credentials`});
            }
        } else {
            return res.status(404).json({status_code: 0, message: `invalid username, user not found`});
        }
    } else {
        return res.status(400).json({status_code: 2, message: error.details[0].message.replace(/"/g, '')});
    }
}

// logout here
export const logout = async (req, res) => {
    try{
        const user_id = req.user.id;
        await User.findByIdAndUpdate(user_id, {refresh_token: null});

        res.clearCookie('token');
        res.clearCookie('refresh_token');
        res.status(200).json({status_code: 1, message: 'logged out successfully'});
    } catch(error) {
        res.staus(500).json({status_code: 0, message: 'something went wrong.'})
    }
}

export const revokeTokens = async (req, res) => {
    try {
        const refresh_token = req.cookies.refresh_token || req.headers['refresh_token'];
        if (!refresh_token) return res.status(401).json({ status_code: 0, message: 'refresh_token missing, login again.' });
    
        let user_id = null;
        jwt.verify(refresh_token, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ status_code: 0, message: 'refresh_token expired, login again.' });
                }
                return res.status(401).json({ status_code: 0, message: 'invalid refresh_token, login again.' });
            }
            user_id = user.id;
        });
    
        const userData = await User.findById(user_id);
        if(userData){
            const { token, refresh_token } = await userData.revokeJwt();
    
            res.cookie('token', token, { httpOnly: true, secure: true });
            res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: true });
            return res.status(200).json({status_code: 1, message: `Tokens revoked successfully.`, token: token, refresh_token: refresh_token});
        } else {
            return res.status(401).json({status_code: 0, message: `Unauthorized request, login again.`});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status_code: 0, message: `Something went wrong.`});
    }
}