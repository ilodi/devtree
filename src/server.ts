import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

const app = express();
connectDB();

// Cors
app.use(cors(corsConfig));

//leer datos de formularios
app.use(express.json());

//app.use, cada que se hace una peticion usara la de el file
app.use('/api', router);

export default app;
