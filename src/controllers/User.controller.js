import { User } from "../models/User.model.js";

const createUser = async (req, res) => {
    const reqData = req.body;

    let result = await User.create(reqData);
    console.log(result);

    res.status(201).json('user created Successfully');
}

const getUsers = async (req, res) => {
    let users = await User.find({});

    res.status(200).json(users);
}

export {
    createUser, getUsers
}

