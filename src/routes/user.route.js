import { Router } from "express";
import { createUser, getUser, getUsers, updateUser } from "../controllers/User.controller.js";

const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .patch(updateUser)
    // .delete(deleteUser);



export default router;