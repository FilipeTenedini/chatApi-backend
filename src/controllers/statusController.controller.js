import participantService from '../services/participant.service.js';

async function create(req, res) {
  const { user } = req.headers;

  if (!user) return res.sendStatus(404);

  try {
    const participant = await participantService.findByName(user);
    if (!participant) return res.sendStatus(404);

    await participantService.update(user);
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
}

export default { create };
