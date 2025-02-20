import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';

console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Fonction utilitaire pour générer un token JWT
const generateToken = (user: any): string => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};

// Vérification du token JWT
export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Token non fourni' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    res.status(200).json({ isAdmin: user.role === 'admin', user });
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Inscription d'un utilisateur
export const register = async (req: Request, res: Response): Promise<void> => {
  // Validation des entrées
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Cet email est déjà utilisé' });
      return;
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('Erreur lors de l\'inscription :', err);
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

// Connexion d'un utilisateur
export const login = async (req: Request, res: Response): Promise<void> => {
  // Validation des entrées
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: 'Identifiants invalides' });
      return;
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};
