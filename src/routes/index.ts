import { Router } from 'express';
import NewsRouter from './NewsRouter';
import kakaoRouter from './kakaoRouter';

const VERSION2 = '/v2';

const router: Router = Router();

router.use(VERSION2 + '/news', NewsRouter);

router.use(VERSION2 + '/auth', kakaoRouter);

export default router;
