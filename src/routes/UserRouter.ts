import express, { Router } from 'express';
import UserController from "../controllers/UserController";
import {errorHandler} from "../error/ErrorHandler";

const router: express.Router = Router();

const FAVORITE = "/favorite";

router.get(FAVORITE + '/all', errorHandler(UserController.getAllFavoriteNewsList));
router.post(FAVORITE + '/add', errorHandler(UserController.addFavoriteNews));
router.post(FAVORITE + '/remove', errorHandler(UserController.removeFavoriteNews));

export default router;
