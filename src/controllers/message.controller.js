import dayjs from 'dayjs';
import participantRepository from '../repositories/participant.repository.js';
import messageRepository from '../repositories/message.repository.js';
import messageSchema from '../models/message.schema.js';

async function create(req, res) {
  const { to, text, type } = req.body;
  const { user } = req.headers;
  const { value, error } = messageSchema.validate({
    to, text, type, from: user,
  });
  if (error) return res.sendStatus(422);
  if (!value.text) return res.sendStatus(422);
  try {
    const participant = await participantRepository.findByName({ name: user });
    if (!participant) return res.sendStatus(422);

    await messageRepository.create({
      ...value,
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
    if (limit) {
      if (limit <= 0 || Number.isNaN(Number(limit))) return res.sendStatus(422);
      const messages = await messageRepository.findByName(user);
      res.send(messages);
    } else {
      const messages = await messageRepository.findByName(user);
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

  const { value, error } = messageSchema.validate({
    to, text, type, from: user,
  });

  if (error) return res.sendStatus(422);

  try {
    const participant = await participantRepository.findByName({ name: user });
    if (!participant) return res.sendStatus(422);

    const msg = await messageRepository.findById(id);
    if (!msg) return res.sendStatus(404);

    if (user !== msg.from) return res.sendStatus(401);

    await messageRepository.updateMsg(id, { ...value });
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
}

async function destroy(req, res) {
  const { id } = req.params;
  const { user } = req.headers;

  try {
    const msg = await messageRepository.findById(id);

    if (!msg) return res.sendStatus(404);

    if (user !== msg.from) return res.sendStatus(401);

    const { deletedCount } = await messageRepository.deleteMsg(id);

    if (deletedCount) return res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
}

export default {
  create, show, destroy, update,
};
