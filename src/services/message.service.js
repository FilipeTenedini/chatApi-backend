import { db } from '../db/db.js';

const create = (body) => db.collection('messages').insertOne(body);

export default { create };
