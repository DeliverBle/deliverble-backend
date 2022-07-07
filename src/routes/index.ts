import { Router } from 'express';
import NewsRouter from "./NewsRouter";

const router: Router = Router();

router.use('/news', NewsRouter);

export default router;
