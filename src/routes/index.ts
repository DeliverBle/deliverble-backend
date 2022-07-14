import { Router } from 'express';
import NewsRouter from './NewsRouter';

const VERSION2 = '/v2';

const router: Router = Router();

router.use(VERSION2 + '/news', NewsRouter);

export default router;
