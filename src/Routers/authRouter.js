import { Router } from "express";
import { signUP, signIn } from "../Controllers/authController.js";
import {ValidateSignUp,ValidateSignIn} from "../Middlewares/authValidateMiddleware.js";
const authRouter = Router();

authRouter.post('/signup', ValidateSignUp, signUP);
authRouter.post('/signin',ValidateSignIn, signIn);
export default authRouter;