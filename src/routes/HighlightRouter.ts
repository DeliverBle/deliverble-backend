import express, { Router } from 'express';
import HighlightController from '../controllers/HighlightController';

const router: express.Router = Router();

router.post('/create', HighlightController.createHighlight);
// TODO: BODY로 받지 말고 PARAM QUERY로 받을 것
router.get('/all', HighlightController.getHighlightByKakaoIdAndNewsId);

export default router;
