import { Request, Response } from 'express';
import { v2 as cloudinaryV2 } from 'cloudinary';
import Hero from '../models/Hero';
import Client, { IClient } from '../models/Client';
import Service, { IService } from '../models/Service';
import { uploadImageToCloudinary } from '../config/uploadUtils';



export const updateHero = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, subtitle, existingImages } = req.body;
  
      let updatedImages: string[] = [];
  
      // Vérifier et parser les images existantes correctement
      if (existingImages) {
        try {
          updatedImages = JSON.parse(existingImages);
        } catch (err) {
          console.warn('Erreur de parsing des images existantes. Utilisation en tableau brut.');
          updatedImages = Array.isArray(existingImages) ? existingImages : [existingImages];
        }
      }
  
      // Gérer les nouvelles images uploadées
      if (req.files) {
        const fileArray = req.files as Express.Multer.File[];
        for (const file of fileArray) {
          const imageUrl = await uploadImageToCloudinary(file.path, 'hero');
          updatedImages.push(imageUrl);
        }
      }
  
      // Préparer les données à mettre à jour
      const updateData: any = {};
      if (title) updateData.title = title;
      if (subtitle) updateData.subtitle = subtitle;
      if (updatedImages.length) updateData.images = updatedImages;
  
      // Mise à jour de la section Hero
      const updatedHero = await Hero.findOneAndUpdate({}, updateData, { new: true, upsert: true });
  
      res.status(200).json({
        message: 'Section Hero mise à jour avec succès',
        data: updatedHero,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la section Hero :', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
    }
  };
  
  
// Contrôleur pour mettre à jour la section Clients

export const updateClients = async (req: Request, res: Response): Promise<void> => {
  try {
      const client = await Client.findOne() || new Client(); // Trouver ou créer le document
      let logos = client.logos || [];

      // Suppression des logos sélectionnés
      if (req.body.removeLogos) {
          const logosToRemove: string[] = req.body.removeLogos;
          logos = logos.filter(logo => !logosToRemove.includes(logo));
      }

      // Ajout des nouveaux fichiers uploadés
      if (req.files) {
          const fileArray = req.files as Express.Multer.File[];
          for (const file of fileArray) {
              const logoUrl = await uploadImageToCloudinary(file.path, 'clients');
              logos.push(logoUrl);
          }
      }

      // Mise à jour du document avec le tableau de logos mis à jour
      client.logos = logos;
      await client.save();

      res.status(200).json({
          message: 'Section Clients mise à jour avec succès',
          data: { logos },
      });
  } catch (error) {
      console.error('Erreur lors de la mise à jour des clients :', error);
      res.status(500).json({
          message: 'Erreur lors de la mise à jour',
          error,
      });
  }
};


// Contrôleur pour mettre à jour la section Services avec gestion d’images

export const updateServices = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Fichiers reçus :", req.files);
    console.log("Données reçues :", req.body);

    const services = Array.isArray(req.body.services) 
      ? req.body.services 
      : JSON.parse(req.body.services || '[]');

    if (!Array.isArray(services)) {
      res.status(400).json({ message: 'Format de services invalide.' });
      return;
    }

    if (services.length > 5) {
      res.status(400).json({ message: 'Vous ne pouvez pas ajouter plus de 5 services.' });
      return;
    }

    const uploadedServices = [];
    const fileArray = req.files as Express.Multer.File[] | undefined;

    for (let i = 0; i < services.length; i++) {
      const service = services[i];

      if (!service.id || service.id === "undefined") {
        res.status(400).json({ message: `L'ID du service à l'index ${i} est manquant ou invalide.` });
        return;
      }

      let imageUrl = service.image;

      // Cherche l'image correspondant au bon ID de service
      if (fileArray) {
        const uploadedFile = fileArray.find(file => file.fieldname === `images[${service.id}]`);
        if (uploadedFile) {
          imageUrl = await uploadImageToCloudinary(uploadedFile.path, 'services');
        }
      }

      const updatedService = await Service.findByIdAndUpdate(
        service.id,
        {
          title: service.title,
          description: service.description,
          image: imageUrl,
        },
        { new: true, upsert: true }
      );

      uploadedServices.push(updatedService);
    }

    res.status(200).json({
      message: 'Les services ont été mis à jour avec succès',
      data: uploadedServices,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des services :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour des services', error });
  }
};



// Contrôleur pour récupérer les données Hero
export const getHero = async (req: Request, res: Response): Promise<void> => {
  try {
    const hero = await Hero.findOne({});
    if (!hero) {
      res.status(404).json({ message: 'Section Hero introuvable' });
    } else {
      res.status(200).json(hero);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

export const getClients = async (req: Request, res: Response): Promise<void> => {
    try {
      const client: IClient | null = await Client.findOne({});
      if (client) {
        res.status(200).json({ logos: client.logos });
      } else {
        res.status(200).json({ logos: [] });
      }
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };
  

  export const getServices = async (req: Request, res: Response): Promise<void> => {
    try {
      // On précise à TypeScript que cette requête retourne une liste d'IService
      const services: IService[] = await Service.find({});
  
      // Reformater la réponse pour convertir `_id` en `id`
      const formattedServices = services.map(service => ({
        id: service._id.toString(),
        title: service.title,
        description: service.description,
        image: service.image
      }));
  
      res.status(200).json(formattedServices);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la récupération des services',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };