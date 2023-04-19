import { ObjectId } from 'mongodb';
import { db } from '../db/db.js';

const create = (body) => db.collection('messages').insertOne(body);

const createMsgs = (list) => db.collection('messages').insertMany(list);

const findByName = (user, limit) => db.collection('messages').find({ $or: [{ to: user }, { to: 'Todos' }, { from: user }] }).sort()
  .limit(limit || 0)
  .toArray();

const findById = (id) => db.collection('messages').findOne({ _id: new ObjectId(id) });

const updateMsg = (id, body) => db.collection('messages').updateOne({ _id: new ObjectId(id) }, { $set: body });

const deleteMsg = (id) => db.collection('messages').deleteOne({ _id: new ObjectId(id) });

export default {
  create, createMsgs, findByName, findById, deleteMsg, updateMsg,
};
