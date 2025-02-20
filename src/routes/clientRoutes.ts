import { Router } from 'express';
import multer from 'multer';
import { getClients, updateClients } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Route pour mettre à jour les logos des clients avec upload
router.post('/admin/update-clients', authMiddleware, upload.array('logos'), updateClients);

// Route pour récupérer les logos des clients
router.get('/admin/get-clients', getClients);

export default router;
