import express, { Router } from 'express';
import HighlightController from '../controllers/HighlightController';

const router: express.Router = Router();

router.post('/create', HighlightController.createHighlight);
router.post('/all', HighlightController.getHighlightByKakaoIdAndNewsId);

export default router;
