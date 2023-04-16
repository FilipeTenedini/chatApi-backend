import { db } from '../db/db.js';

const findByName = (body) => db.collection('participants').findOne(body);
const create = (body) => db.collection('participants').insertOne(body);
const findAll = () => db.collection('participants').find().toArray();
const update = (user) => db.collection('participants').updateOne({ name: user }, { $set: { lastStatus: Date.now() } });

export default {
  findByName, create, findAll, update,
};
