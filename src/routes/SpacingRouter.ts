import express, { Router } from 'express';
import SpacingController from '../controllers/SpacingController';


const router: express.Router = Router();

router.post('/create', SpacingController.createSpacing);

router.get('/', SpacingController.getSpacing);

router.post('/remove', SpacingController.removeSpacing);


export default router;
