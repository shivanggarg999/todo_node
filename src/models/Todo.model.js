import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum : ['Completed', 'Pending'],
        default: 'Pending'
    }
}, {timestamps: true});

export const Todo = mongoose.model('Todo', todoSchema);