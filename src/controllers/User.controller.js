import mongoose from "mongoose";
import { User } from "../models/User.model.js";
import Joi from 'joi';

// defined validation rules
const createUserSchema = Joi.object({
    fullName: Joi.string().required(),
    mobile: Joi.number().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
});

export const createUser = async (req, res) => {
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

export const getUsers = async (req, res) => {
    await User.find().select({ 
        _id: 1, fullName: 1, mobile: 1, gender: 1, createdAt: 1, updatedAt: 1
    })
    .then( users => {
        if(users.length > 0){
            res.status(200).json({status: 1, message: 'data fetched successfully', data: users});
        } else {
            res.status(201).json({status: 2, message: 'data not found'});
        }
    })
    .catch(error => {
        res.status(200).json({status: 0, message: 'Something went wrong'})
    })
}

export const getUser = async (req, res) => {
    try{
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ status: 0, message: 'Invalid user ID format' });
        }

        const user = await User.findById(userId).select('_id fullName mobile gender createdAt updatedAt');
        if(user){
            res.status(200).json({status: 1, message: 'data fetched successfully', data: user});
        } else {
            res.status(201).json({status: 2, message: 'data not found'});
        }
    }
    catch (error) {
        console.error(`Error fetching user: ${error.message}`);
        res.status(500).json({ status: 0, message: 'Something went wrong' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { error, value } = createUserSchema.validate(req.body);

        if (error) {
            return res.status(400).json({status: 2, message: error.details[0].message.replace(/"/g, '')});
        }

        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ status: 0, message: 'Invalid user ID format' });
        }

        const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ status: 2, message: 'User not found' });
        }
        res.status(200).json({ status: 1, message: 'User updated successfully'});
    } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        res.status(500).json({ status: 0, message: 'Something went wrong'});
    }
}