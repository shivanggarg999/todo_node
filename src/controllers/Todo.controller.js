import { Category } from "../models/Category.model.js";
import { Todo } from "../models/Todo.model.js";


const createTodo = async (req, res) => {
    const { title, description, status } = req.body;
    const todo = { title, description, status };
    
    let result = await Todo.create(todo);

    let category = await Category.findById(req.body.cat_id);
    await category.todos.push(result.id);
    await category.save();

    return res.status(201).json('Todo Created successfully');
}


const getTodos = async (req, res) => {
    let data = await Todo.find({});

    return res.status(200).json(data);
}

export {
    createTodo, getTodos
}