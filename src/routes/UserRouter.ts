import express, { Router } from 'express';
import UserController from "../controllers/UserController";
import {errorHandler} from "../error/ErrorHandler";

const router: express.Router = Router();

const FAVORITE = "/favorite";

router.get(FAVORITE + '/all', errorHandler(UserController.getAllFavoriteNewsList));
// router.get('/recommend', NewsController.recommendNews);
// router.get('/detail/:newsId', NewsController.newsDetail);

export default router;
