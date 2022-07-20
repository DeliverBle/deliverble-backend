import express, { Router } from 'express';
import HighlightController, {
  removeHighlightByKakaoIdAndHighlightId,
} from '../controllers/HighlightController';

const router: express.Router = Router();

const MEMO: string = '/memo';

router.post(MEMO + '/add', HighlightController.addNewMemoOfHighlight);
router.post('/remove', HighlightController.removeHighlightByKakaoIdAndHighlightId);
router.post('/create', HighlightController.createHighlight);
router.get('/', HighlightController.getHighlightByKakaoIdAndNewsId);

export default router;
