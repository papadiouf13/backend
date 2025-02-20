import express, { Request, Response } from 'express';
import multer from 'multer';
import { updateHero } from '../controllers/adminController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/admin/update-hero', upload.array('files'), updateHero);

export default router;
