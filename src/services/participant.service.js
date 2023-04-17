import { db } from '../db/db.js';

const create = (body) => db.collection('participants').insertOne(body);

const findByName = (body) => db.collection('participants').findOne(body);

const findAll = () => db.collection('participants').find().toArray();

const find = (timeStamp) => db.collection('participants').find({ lastStatus: { $lt: timeStamp } }).toArray();

const update = (user) => db.collection('participants').updateOne({ name: user }, { $set: { lastStatus: Date.now() } });

const destroy = (ids) => db.collection('participants').deleteMany({ _id: { $in: ids } });

export default {
  findByName, findAll, find, create, update, destroy,
};
