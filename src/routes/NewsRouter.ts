import express, { Router } from "express";
import NewsController from "../controllers/NewsController";

const router: express.Router = Router();

router.post('/search', NewsController.searchNews);

export default router;
