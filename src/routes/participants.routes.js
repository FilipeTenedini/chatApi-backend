import { Router } from 'express';
import participantController from '../controllers/participant.controller.js';

const route = Router();

route.post('/', participantController.create);
route.get('/', participantController.list);

export default route;
