import mongoose, { Schema, Document } from 'mongoose';

// Interface TypeScript pour les Services
export interface IService extends Document {
  title: string;
  description: string;
  image: string;
}

// Définition du schéma avec TypeScript
const serviceSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

// Export du modèle Mongoose en utilisant l'interface IService
const Service = mongoose.model<IService>('Service', serviceSchema);
export default Service;
