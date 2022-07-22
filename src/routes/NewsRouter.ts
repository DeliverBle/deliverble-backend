import express, { Router } from 'express';
import NewsController from '../controllers/NewsController';
import {errorHandler} from "../error/ErrorHandler";

const router: express.Router = Router();

router.post('/search', errorHandler(NewsController.searchNews));
router.get('/recommend', errorHandler(NewsController.recommendNews));
router.get('/detail/:newsId', errorHandler(NewsController.newsDetail));

export default router;
