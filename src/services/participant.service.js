import { db } from '../db/db.js';

const findByName = (name) => db.collection('participants').findOne({ name });

const create = (body) => db.collection('participants').insertOne(body);

export default { findByName, create };
