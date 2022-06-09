import { Router } from "express";
import {makeShortUrl, findShortUrl, openUrl, deleteUrl} from "../Controllers/urlsController.js";
import {validateToken,validateBodyShortUrl} from "../Middlewares/urlsMiddleware.js";
const urlsRouter= Router();

urlsRouter.post("/urls/shorten",validateToken ,validateBodyShortUrl, makeShortUrl)
urlsRouter.get("/urls/:id", findShortUrl)
urlsRouter.get("/urls/open/:shortUrl", openUrl)
urlsRouter.delete("/urls/:id", deleteUrl)

export default urlsRouter;