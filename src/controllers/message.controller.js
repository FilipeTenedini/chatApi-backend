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

async function update(req, res) {
  const { to, text, type } = req.body;
  const { user } = req.headers;
  const { id } = req.params;

  if (messageSchema.validate({
    to,
    text,
    type,
    from: user,
  }).error) return res.sendStatus(422);

  try {
    const participant = await participantService.findByName(user);
    if (!participant) return res.sendStatus(422);

    const msg = await messageService.findById(id);
    if (!msg) return res.sendStatus(404);
    if (user !== msg.from) return res.sendStatus(401);
    await messageService.updateMsg(id, { to, text, type });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
}

async function destroy(req, res) {
  const { id } = req.params;
  const { user } = req.headers;

  try {
    const msg = await messageService.findById(id);

    if (!msg) return res.sendStatus(404);

    if (user !== msg.from) return res.sendStatus(401);

    console.log('temo aki');
    const { deletedCount } = await messageService.deleteMsg(id);
    console.log(deletedCount);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
}
export default {
  create, show, destroy, update,
};
