import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import participantsRouter from './routes/participants.routes.js';
import messagesRouter from './routes/messages.routes.js';
import statusRouter from './routes/status.routes.js';
import connectDatabase from './db/db.js';
import removeInactiveParticipants from './utils/removeInactiveParticipants.js';

dotenv.config();

const app = express();

connectDatabase();

app.use(cors());

app.use(express.json());

app.use('/participants', participantsRouter);

app.use('/messages', messagesRouter);

app.use('/status', statusRouter);

removeInactiveParticipants();

app.listen(5000, () => console.log(`Server started at http://localhost:${process.env.PORT}`));
