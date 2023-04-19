import participantRepository from '../repositories/participant.repository.js';

async function create(req, res) {
  const { user } = req.headers;

  if (!user) return res.sendStatus(404);

  try {
    const participant = await participantRepository.findByName({ name: user });
    if (!participant) return res.sendStatus(404);

    await participantRepository.update(user);
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
}

export default { create };
