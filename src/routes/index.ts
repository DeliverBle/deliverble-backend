import { Router } from 'express';
import NewsRouter from './NewsRouter';
import kakaoRouter from './kakaoRouter';
import UserRouter from "./UserRouter";

const VERSION2 = '/v2';

const router: Router = Router();

router.get('/', function(req, res, next) {
    res.send('hello')
});

router.use(VERSION2 + '/user', UserRouter);

router.use(VERSION2 + '/news', NewsRouter);

router.use(VERSION2 + '/auth', kakaoRouter);

export default router;
