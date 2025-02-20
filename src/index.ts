import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';
import { setupSwagger } from './swagger';

dotenv.config();

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Vérifiez si la variable est chargée

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// Configuration de Swagger
setupSwagger(app);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
