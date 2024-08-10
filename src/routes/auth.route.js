import { Router } from "express";
import AuthenticateUser from "../middlewares/Authenicate.middleware.js";
import { register, login, logout, revokeTokens } from "../controllers/Auth/Auth.controller.js";

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get( AuthenticateUser, logout);
router.route('/revokeTokens').post(revokeTokens);



export default router;