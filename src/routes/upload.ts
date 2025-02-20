import express, { Request, Response } from 'express';
import multer from 'multer';
import { uploadImageToCloudinary } from '../config/uploadUtils';

const router = express.Router();

// Middleware Multer pour plusieurs fichiers
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.array('files'), async (req: Request, res: Response): Promise<void> => {
  if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
    res.status(400).json({ message: 'Aucun fichier téléchargé' });
    return;
  }

  try {
    const files = req.files as Express.Multer.File[];

    // Upload de chaque fichier vers Cloudinary
    const uploadPromises = files.map(file => uploadImageToCloudinary(file.path));
    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({ urls: imageUrls });
  } catch (error) {
    console.error('Erreur lors de l’upload :', error);
    res.status(500).json({ message: 'Erreur lors de l’upload des images', error });
  }
});

export default router;
