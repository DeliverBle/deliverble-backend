import express, { Router } from 'express';
import SpacingController from '../controllers/SpacingController';


const router: express.Router = Router();

router.post('/create', SpacingController.createSpacing);
// TODO: BODY로 받지 말고 PARAM QUERY로 받을 것


export default router;
