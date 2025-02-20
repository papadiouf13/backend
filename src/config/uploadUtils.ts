import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

export const uploadImageToCloudinary = async (filePath: string, folder: string = 'stream-management'): Promise<string> => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: `stream-management/${folder}`, // Placer dans le sous-dossier spécifique
    });
    await fs.unlink(filePath); // Supprimer le fichier temporaire après l'upload
    return uploadResult.secure_url;
  } catch (error) {
    console.error('Erreur lors de l’upload vers Cloudinary :', error);
    throw new Error('Échec de l’upload de l’image');
  }
};
