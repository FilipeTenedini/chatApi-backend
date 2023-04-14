import userSchema from '../models/user.schema.js';

function create(req, res) {
  const { name } = req.body;
  console.log(name);
}

export default { create };
