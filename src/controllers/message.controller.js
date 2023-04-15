import dayjs from 'dayjs';
import participantService from '../services/participant.service.js';
import messageService from '../services/message.service.js';
import messageSchema from '../models/message.schema.js';

async function create(req, res) {
  const { to, text, type } = req.body;
  const { user } = req.headers;

  if (messageSchema.validate({
    to,
    text,
    type,
    from: user,
  }).error) return res.sendStatus(422);

  try {
    const participant = await participantService.findByName(user);
    if (!participant) return res.sendStatus(422);

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

async function show(req, res) {
  const { user } = req.headers;
  const { limit } = req.query;

  try {
    const messages = await messageService.findByName(user);
    if (limit) {
      if (limit <= 0 || Number.isNaN(Number(limit))) return res.sendStatus(422);
      res.send(messages.slice(0, limit));
    } else {
      return res.send(messages);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export default { create, show };
