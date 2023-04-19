import dayjs from 'dayjs';
import participantRepository from '../repositories/participant.repository.js';
import messageRepository from '../repositories/message.repository.js';
import userSchema from '../models/user.schema.js';

async function create(req, res) {
  const { name } = req.body;
  const { value, error } = userSchema.validate({ name });
  if (error) return res.sendStatus(422);

  const lastStatus = Date.now();

  try {
    const participant = await participantRepository.findByName(value);
    if (participant) return res.sendStatus(409);

    await participantRepository.create({ ...value, lastStatus });

    await messageRepository.create({
      from: value.name,
      to: 'Todos',
      text: 'entra na sala...',
      type: 'status',
      time: dayjs(lastStatus).format('HH:mm:ss'),
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
}

async function show(req, res) {
  const participants = await participantRepository.findAll();
  res.send(participants);
}
export default { create, show };
