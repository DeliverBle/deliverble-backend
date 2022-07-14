import express, { Router } from 'express';
import NewsController from '../controllers/NewsController';
import passport from 'passport';
import kakaoLoginStrategy from '../controllers/kakao-login';

const router: express.Router = Router();

// register kakao-login strategy
kakaoLoginStrategy();

router.get('/kakao', passport.authenticate('kakao-login'));
router.get(
  '/kakao/oauth',
  passport.authenticate('kakao-login', {
    failureRedirect: '/', session: false
  }),
  (req, res) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> YE');
    NewsController.callbackKakao(req, res).then((v) => console.log('kakao login succeeded'));
  },
);

export default router;
