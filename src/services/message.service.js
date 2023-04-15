import { db } from '../db/db.js';

const create = (body) => db.collection('messages').insertOne(body);
const findByName = (user) => db.collection('messages').find({ $or: [{ to: user }, { to: 'Todos' }, { from: user }] }).toArray();

export default { create, findByName };
