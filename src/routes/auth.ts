import express from 'express';
import { register, login, verifyToken } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       400:
 *         description: L'email est déjà utilisé
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie avec le token JWT
 *       400:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/verify-token:
 *   get:
 *     summary: Vérifie si le token JWT est valide
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Le token est valide, et les informations de l'utilisateur sont retournées
 *       401:
 *         description: Token invalide ou non fourni
 */
router.get('/verify-token', verifyToken);

export default router;
