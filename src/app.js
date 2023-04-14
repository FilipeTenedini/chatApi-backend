import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.listen(5000, () => console.log(`Server started at http://localhost:${process.env.PORT}`));
