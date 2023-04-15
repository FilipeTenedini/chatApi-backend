function create(req, res) {
  const { to, text, type } = req.body;
  const { user } = req.header;
  console.log(to, text, type, user, res);
}

export default { create };
