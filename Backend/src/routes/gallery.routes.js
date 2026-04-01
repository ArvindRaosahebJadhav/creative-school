import express from 'express';
import {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from '../controllers/gallery.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getGallery);
router.get('/:id', getGalleryById);
router.post('/', authMiddleware, upload.single('file'), createGallery);
router.put('/:id', authMiddleware, upload.single('file'), updateGallery);
router.delete('/:id', authMiddleware, deleteGallery);

export default router;
