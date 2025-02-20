import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

dotenv.config();

// Interface personnalisée pour la requête
interface CustomRequest extends Request {
  user?: any;  // Utiliser un type spécifique si possible
}

const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const user = await User.findById(decoded.id).select('-password');  // Récupérer l'utilisateur sans le mot de passe

    if (!user) {
      res.status(401).json({ error: 'User not found.' });
      return;
    }

    req.user = user;
    next();  // Continue vers le contrôleur
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ error: 'Invalid token.' });
    } else {
      res.status(500).json({ error: 'Server error.' });
    }
  }
};

export default authMiddleware;