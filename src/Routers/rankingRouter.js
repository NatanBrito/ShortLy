import { Router } from "express";
import { ranking } from "../Controllers/rankingController.js";
const rankingRouter= Router();

rankingRouter.get('/ranking', ranking);


export default rankingRouter;
