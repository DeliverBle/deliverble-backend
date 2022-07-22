import express, { Router } from 'express';
import NewsController from '../controllers/NewsController';
import passport from 'passport';
import kakaoLoginStrategy from '../controllers/kakao-login';
import UserController from "../controllers/UserController";
import {errorHandler} from "../error/ErrorHandler";
import redis from 'redis';
import {promisify} from "util";
import {DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS, DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS} from "../shared/AuthLink";
import StatusCode from "../modules/statusCode";

const router: express.Router = Router();

const port = 6379;
const host = 'localhost';
const password = 'changeme';
const redisClient = redis.createClient(port, host);
redisClient.auth(password);

redisClient.on('connect', function () {
    console.log('Redis plugged in.');
});


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

router.get('/kakao/token', UserController.getAccessTokenByCode);

router.post('/kakao/access-token/refresh', errorHandler(UserController.refreshAccessToken));

router.post('/login', errorHandler(UserController.loginUserWithKakao));

router.post('/signup', errorHandler(UserController.signUpUserWithKakao));

router.post('/logout', errorHandler(UserController.logOutUserWithKakao));

export default router;
