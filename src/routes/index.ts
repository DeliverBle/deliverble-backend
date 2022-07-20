import { Router } from 'express';
import NewsRouter from './NewsRouter';
import kakaoRouter from './kakaoRouter';
import UserRouter from "./UserRouter";
import HighlightRouter from './HighlightRouter';
import SpacingRouter from './SpacingRouter';

const VERSION2 = '/v2';

const router: Router = Router();

router.get('/', function(req, res, next) {
    res.send('hello')
});

router.use(VERSION2 + '/user', UserRouter);

router.use(VERSION2 + '/news', NewsRouter);

router.use(VERSION2 + '/auth', kakaoRouter);

router.use(VERSION2 + '/highlight', HighlightRouter);

router.use(VERSION2 + '/spacing', SpacingRouter);

export default router;
