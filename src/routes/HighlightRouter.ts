import express, { Router } from 'express';
import HighlightController from '../controllers/HighlightController';

const router: express.Router = Router();

router.post('/create', HighlightController.createHighlight);

export default router;
