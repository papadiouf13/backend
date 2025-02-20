import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 10000,  
      socketTimeoutMS: 45000,  
      connectTimeoutMS: 10000, 
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1); 
  }
};

export default connectDB;
