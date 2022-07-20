import express, { Router } from 'express';
import HighlightController, {
  removeExistingMemoOfHighlight,
  removeHighlightByKakaoIdAndHighlightId,
  updateExistingMemoOfHighlight,
} from '../controllers/HighlightController';

const router: express.Router = Router();

const MEMO: string = '/memo';

router.post(MEMO + '/update', HighlightController.updateExistingMemoOfHighlight);
router.post(MEMO + '/remove', HighlightController.removeExistingMemoOfHighlight);
router.post(MEMO + '/add', HighlightController.addNewMemoOfHighlight);
router.post('/remove', HighlightController.removeHighlightByKakaoIdAndHighlightId);
router.post('/create', HighlightController.createHighlight);
router.get('/', HighlightController.getHighlightByKakaoIdAndNewsId);

export default router;
