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
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

// cast time in format
todoSchema.methods.toJSON = function () {
    const todo = this.toObject();
    todo.createdAt = moment(todo.createdAt).format('DD-MM-YYYY hh:mm:ss A');
    todo.updatedAt = moment(todo.updatedAt).format('DD-MM-YYYY hh:mm:ss A');
    return todo;
};

export const Todo = mongoose.model('Todo', todoSchema);