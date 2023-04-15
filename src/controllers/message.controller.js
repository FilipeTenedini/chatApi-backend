import dayjs from 'dayjs';
import participantService from '../services/participant.service.js';
import messageService from '../services/message.service.js';
import messageSchema from '../models/message.schema.js';

async function create(req, res) {
  const { to, text, type } = req.body;
  const { user } = req.headers;

  try {
    if (messageSchema.validate({
      to,
      text,
      type,
      from: user,
    }).error) return res.status(422).send('object infos error');

    const participant = await participantService.findByName(user);
    if (!participant) return res.status(422).send('participant not connected');

    await messageService.create({
      to,
      text,
      type,
      from: user,
      time: dayjs(Date.now()).format('HH:mm:ss'),
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
  }
}

export default { create };
