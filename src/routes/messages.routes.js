import { Router } from 'express';
import messageControler from '../controllers/message.controller.js';

const route = Router();

route.post('/', messageControler.create);
route.get('/', messageControler.show);

export default route;
