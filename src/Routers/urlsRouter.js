import { Router } from "express";
import {makeShortUrl} from "../Controllers/urlsController.js";
import {validateToken} from "../Middlewares/urlsMiddleware.js";
const urlsRouter= Router();

urlsRouter.post("/urls/shorten",validateToken , makeShortUrl)

export default urlsRouter;