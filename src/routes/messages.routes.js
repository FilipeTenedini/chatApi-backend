import { Router } from 'express';
import messageController from '../controllers/message.controller.js';

const route = Router();

route.post('/', messageController.create);
route.get('/', messageController.show);
route.delete('/:id', messageController.destroy);
// route.put('/:id', messageController.update);

export default route;
