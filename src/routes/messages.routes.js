import { Router } from 'express';
import messageControler from '../controllers/message.controller.js';

const route = Router();

route.post('/', messageControler.create);

export default route;
