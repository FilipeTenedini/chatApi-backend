import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import participantsRouter from './routes/participants.routes.js';
import statusRouter from './routes/status.routes.js';
import connectDatabase from './db/db.js';

dotenv.config();

const app = express();

connectDatabase();

app.use(cors());

app.use(express.json());

app.use('/participants', participantsRouter);

app.use('/status', statusRouter);

app.listen(5000, () => console.log(`Server started at http://localhost:${process.env.PORT}`));
