import { Router } from "express";
import { createTodo, getTodos } from "../controllers/Todo.controller.js";

const router = Router();

router.route('/').get(getTodos).post(createTodo);

export default router;