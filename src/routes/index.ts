import { Router } from 'express';
import NewsRouter from './NewsRouter';
import passport from 'passport';
import kakaoRouter from './kakaoRouter';

const VERSION = '/v2';

const router: Router = Router();

router.use(VERSION + '/news', NewsRouter);

router.use(VERSION + '/auth', kakaoRouter);

export default router;
