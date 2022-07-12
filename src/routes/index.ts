import { Router } from 'express';
import NewsRouter from './NewsRouter';

const VERSION = '/v1';

const router: Router = Router();

router.use(VERSION + '/news', NewsRouter);

export default router;
