import { Category } from "../models/Category.model.js";

const createCategory = async (req, res) => {
    const reqData = req.body;

    let result = await Category.create(reqData);

    return res.status(201).json('Category Created successfully !!');
}

const getCategories = async (req, res) => {
    let data = await Category.find({});

    // using populate we will get nested todos detail also 
    // let data = await Category.find({}).populate('todos');

    res.status(200).json(data);
}

export {
    createCategory, getCategories
}