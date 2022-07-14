import express, { Router } from 'express';
import NewsController from '../controllers/NewsController';

const router: express.Router = Router();

router.post('/search', NewsController.searchNews);
router.get('/recommend', NewsController.recommendNews);
router.get('/detail', NewsController.newstDetail);

export default router;
