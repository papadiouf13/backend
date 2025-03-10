import express from 'express';
import { updateHero, updateClients, updateServices, getHero, getClients, getServices, addService, deleteService } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/admin/update-hero:
 *   post:
 *     summary: Mettre à jour la section Hero avec plusieurs images
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Mise à jour réussie
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur interne du serveur
 */
router.patch('/update-hero', authMiddleware, upload.array('images', 5), updateHero);

/**
 * @swagger
 * /api/admin/update-clients:
 *   post:
 *     summary: Mettre à jour la section Clients avec des images de logos
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Mise à jour réussie avec les nouveaux logos
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/update-clients', authMiddleware, upload.array('logos', 30), updateClients);

/**
 * @swagger
 * /api/admin/get-clients:
 *   get:
 *     summary: Récupérer la liste des logos des clients
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Liste des logos récupérée avec succès
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/get-clients', getClients);

/**
 * @swagger
 * /api/admin/update-services:
 *   patch:
 *     summary: Mettre à jour plusieurs services (titre, description, image)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               services:
 *                 type: string
 *                 description: "Tableau JSON des services à mettre à jour"
 *                 example: '[{"id": "123", "title": "Nouveau Titre", "description": "Nouvelle Description"}, {"id": "456", "title": "Autre Titre"}]'
 *               images:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                   format: binary
 *                   description: "Image associée à un service (clé = ID du service)"
 *     responses:
 *       200:
 *         description: Services mis à jour avec succès
 *       400:
 *         description: Requête invalide (format incorrect, ID manquant, etc.)
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 *       404:
 *         description: Un ou plusieurs services non trouvés
 *       500:
 *         description: Erreur interne du serveur
 */
router.patch('/update-services', authMiddleware, upload.any(), updateServices);


/**
 * @swagger
 * /api/admin/get-hero:
 *   get:
 *     summary: Récupérer les données de la section Hero
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Données récupérées avec succès
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/get-hero', getHero);

/**
 * @swagger
 * /api/admin/get-services:
 *   get:
 *     summary: Récupérer la liste des services
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Liste des services récupérée avec succès
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/get-services', getServices);


/**
 * @swagger
 * /api/admin/add-service:
 *   post:
 *     summary: Ajouter un nouveau service (max 4)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Titre du service"
 *               description:
 *                 type: string
 *                 description: "Description du service"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Fichier image à uploader"
 *     responses:
 *       201:
 *         description: Service ajouté avec succès
 *       400:
 *         description: Requête invalide (plus de 4 services, champs manquants)
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /api/admin/add-service:
 *   post:
 *     summary: Ajouter un nouveau service (max 4)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Titre du service"
 *               description:
 *                 type: string
 *                 description: "Description du service"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Fichier image à uploader"
 *     responses:
 *       201:
 *         description: Service ajouté avec succès
 *       400:
 *         description: Requête invalide (plus de 4 services, champs manquants)
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/add-service', authMiddleware, upload.single('image'), addService);

/**
 * @swagger
 * /api/admin/delete-service/{id}:
 *   delete:
 *     summary: Supprimer un service par ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du service à supprimer
 *     responses:
 *       200:
 *         description: Service supprimé avec succès
 *       400:
 *         description: Requête invalide (ID non trouvé)
 *       401:
 *         description: Non autorisé (JWT manquant ou invalide)
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete('/delete-service/:id', authMiddleware, deleteService);

export default router;
