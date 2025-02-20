import { Request, Response } from 'express';
import { v2 as cloudinaryV2 } from 'cloudinary';
import multer from 'multer';
import { uploadImageToCloudinary } from '../config/uploadUtils';

// Configuration de multer (stockage temporaire)
const upload = multer({ dest: 'uploads/' });

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ message: 'Aucun fichier téléchargé' });
      return;
    }
  
    try {
      // Appelle la fonction utilitaire pour l’upload
      const imageUrl = await uploadImageToCloudinary(req.file.path);
      res.status(200).json({ url: imageUrl });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l’upload de l’image', error });
    }
  };
