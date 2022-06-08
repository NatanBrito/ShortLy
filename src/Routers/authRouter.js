import { Router } from "express";
import { signUP } from "../Controllers/authController.js";
import {ValidateSignUp} from "../Middlewares/authValidateMiddleware.js";
const authRouter = Router();

authRouter.post('/teste', ValidateSignUp, signUP)

export default authRouter;