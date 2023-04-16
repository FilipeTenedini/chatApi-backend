import dayjs from 'dayjs';
import participantService from '../services/participant.service.js';
import messageService from '../services/message.service.js';
import userSchema from '../models/user.schema.js';
import sanitizeRequest from '../models/sanitize-html.js';

async function create(req, res) {
  const { name } = req.body;

  if (userSchema.validate({ name }).error) return res.sendStatus(422);

  const lastStatus = Date.now();

  try {
    const participant = await participantService.findByName(name);
    if (participant) return res.sendStatus(409);

    await participantService.create({ name, lastStatus });

    await messageService.create({
      from: name,
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
  const participants = await participantService.findAll();
  res.send(participants);
}
export default { create, show };
