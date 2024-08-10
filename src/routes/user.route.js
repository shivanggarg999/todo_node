import { Router } from "express";
import { getUser, getUserList, updateUser } from "../controllers/User.controller.js";
import AuthenticateUser from "../middlewares/Authenicate.middleware.js";

const router = Router();
router.use(AuthenticateUser);

router.route('/')
    .get(getUserList)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .patch(updateUser)
    // .delete(deleteUser);



export default router;