import express, { Router } from 'express';
import HighlightController, {
  removeHighlightByKakaoIdAndHighlightId,
} from '../controllers/HighlightController';

const router: express.Router = Router();

router.post('/remove', HighlightController.removeHighlightByKakaoIdAndHighlightId);
router.post('/create', HighlightController.createHighlight);
router.get('/', HighlightController.getHighlightByKakaoIdAndNewsId);

export default router;
