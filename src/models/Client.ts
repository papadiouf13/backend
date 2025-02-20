import mongoose, { Schema, Document, model } from 'mongoose';

// Définition de l'interface pour les clients
export interface IClient extends Document {
  logos: string[];
}

// Schéma Mongoose
const clientSchema = new Schema<IClient>({
  logos: { type: [String], required: true }, // Un tableau de chaînes
});

// Modèle Mongoose
const Client = model<IClient>('Client', clientSchema);

export default Client;
