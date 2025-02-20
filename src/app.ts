import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import heroRoutes from './routes/heroRoutes';
import clientRoutes from './routes/clientRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/hero', heroRoutes);
app.use('/api/client', clientRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue dans l’API backend avec Express et TypeScript');
});

app.listen(port, () => {
  console.log(`Le serveur tourne sur http://localhost:${port}`);
});
