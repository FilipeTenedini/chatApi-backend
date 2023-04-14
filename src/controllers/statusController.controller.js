function create(req, res) {
  const { user } = req.header;
  if (!user) return res.sendStatus(404);

  console.log('hello from controller');
}

export default { create };
