import { ObjectId } from 'mongodb';
import { db } from '../db/db.js';

const create = (body) => db.collection('messages').insertOne(body);

const findByName = (user) => db.collection('messages').find({ $or: [{ to: user }, { to: 'Todos' }, { from: user }] }).toArray();

const findById = (id) => db.collection('messages').findOne({ _id: new ObjectId(id) });

const deleteMsg = (id) => db.collection('messages').deleteOne({ _id: new ObjectId(id) });

export default {
  create,
  findByName,
  findById,
  deleteMsg,
};
