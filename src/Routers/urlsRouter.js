import { Router } from "express";
import {makeShortUrl} from "../Controllers/urlsController.js";
import {validateToken,validateBodyShortUrl} from "../Middlewares/urlsMiddleware.js";
const urlsRouter= Router();

urlsRouter.post("/urls/shorten",validateToken ,validateBodyShortUrl, makeShortUrl)

export default urlsRouter;