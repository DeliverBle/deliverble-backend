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
      const code = req.query.code;
      const accessToken = req['user'][0];
      const refreshToken = req['user'][1];
      const userId = req['user'][2].toString();
      console.log("accessToken: " + accessToken);
      console.log("userId: " + userId);
      // TODO: initial callback to save refreshToken at Redis with userId
      // await UserService.saveTokensAtRedisWithUserId(userId, accessToken, refreshToken, code);
      const ACCESS_TOKEN = "AT " + code;
      const USER_ID = "UD " + code;
      promisify(redisClient.get).bind(redisClient);
      // TODO: move validation logic to other class
      console.log("82 >>>>> ", ACCESS_TOKEN, USER_ID);
      await redisClient.setex(
          ACCESS_TOKEN,
          DEFAULT_ACCESS_TOKEN_EXPIRATION_SECONDS,
          accessToken,
      );
      console.log("88 >>>>> ", ACCESS_TOKEN, USER_ID);
      await redisClient.setex(
          USER_ID,
          DEFAULT_REFRESH_TOKEN_EXPIRATION_SECONDS,
          userId,
      );
      console.log("94 >>>>> ", ACCESS_TOKEN, USER_ID);
      res.status(StatusCode.OK).send({
          status: StatusCode.OK,
          message: {
              accessToken: accessToken,
              expired_in: 21600,
              userId,
          },
      });
      // await UserController.callbackKakao(req, res).then((v) => console.log('kakao login succeeded'));
  },
);

router.get('/kakao/token', UserController.getAccessTokenByCode);

// router.post('/kakao/access-token/refresh', errorHandler(UserController.refreshAccessToken));

router.post('/login', errorHandler(UserController.loginUserWithKakao));

router.post('/signup', errorHandler(UserController.signUpUserWithKakao));

router.post('/logout', errorHandler(UserController.logOutUserWithKakao));

export default router;
