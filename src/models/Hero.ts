import mongoose, { Document, Schema } from 'mongoose';

export interface IHero extends Document {
  title: string;
  subtitle: string;
  images: string[];
}

const heroSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  images: { type: [String], required: true },
});

const Hero = mongoose.model<IHero>('Hero', heroSchema);
export default Hero;
