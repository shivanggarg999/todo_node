import { User } from "../models/User.model.js";
import Joi from 'joi';
import fs from 'fs';

const createUser = async (req, res) => {
    
    // defined validation rules
    const createUserSchema = Joi.object({
        fullName: Joi.string().required(),
        mobile: Joi.number().required(),
        gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    });
    const { error, value } = createUserSchema.validate(req.body);

    if (error) {
        return res.status(400).json({status: 2, message: error.details[0].message.replace(/"/g, '')});
    }

    try {
        await User.create(req.body);
        res.status(201).json({status: 1, message: 'user created Successfully'});
    } catch (error) {
        if (error.code == 11000) {
            res.status(401).json({status: 0, message: 'mobile already exist'});
        } else {
            res.status(500).json({status: 0, message: 'Something went wrong !'});
        }
    }

}

const getUsers = async (req, res) => {
    let users = await User.find({});

    res.status(200).json(users);
}

export {
    createUser, getUsers
}

