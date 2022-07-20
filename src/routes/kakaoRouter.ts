import express, { Router } from 'express';
import NewsController from '../controllers/NewsController';
import passport from 'passport';
import kakaoLoginStrategy from '../controllers/kakao-login';
import UserController from "../controllers/UserController";
import {errorHandler} from "../error/ErrorHandler";

const router: express.Router = Router();

// register kakao-login strategy
kakaoLoginStrategy();

router.get('/kakao', passport.authenticate('kakao-login'));

router.get(
  '/kakao/oauth',
  passport.authenticate('kakao-login', {
    failureRedirect: '/', session: false
  }),
  async (req, res) => {
      await UserController.callbackKakao(req, res).then((v) => console.log('kakao login succeeded'));
  },
);

router.get('/kakao/token', UserController.getAccessTokenAndUserIdByCode);

// router.post('/kakao/access-token/refresh', errorHandler(UserController.refreshAccessToken));

router.post('/login', errorHandler(UserController.loginUserWithKakao));

router.post('/signup', errorHandler(UserController.signUpUserWithKakao));

router.post('/logout', errorHandler(UserController.logOutUserWithKakao));

export default router;
