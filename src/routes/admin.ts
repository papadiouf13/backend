import express from 'express';
import { updateHero, updateClients, updateServices, getHero, getClients, getServices } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';
import multer from 'multer';

// Configurer multer pour capturer les fichiers temporairement
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
 *   post:
 *     summary: Mettre à jour la section Services avec ou sans image
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
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Mise à jour réussie
 *       401:
 *         description: Non autorisé
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

export default router;
