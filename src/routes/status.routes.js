import { Router } from 'express';
import statusController from '../controllers/statusController.controller.js';

const route = Router();

route.post('/', statusController.create);

export default route;
