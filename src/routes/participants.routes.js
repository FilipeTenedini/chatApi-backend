import { Router } from 'express';
import participantController from '../controllers/participant.controller.js';

const route = Router();

route.post('/', participantController.create);

export default route;
