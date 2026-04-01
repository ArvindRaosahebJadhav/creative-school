import express from 'express';
import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievement.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAchievements);
router.get('/:id', getAchievementById);
import { upload } from '../middleware/upload.middleware.js';

// frontend uses field name 'image' for achievement uploads
router.post('/', authMiddleware, upload.single('image'), createAchievement);
router.put('/:id', authMiddleware, upload.single('image'), updateAchievement);
router.delete('/:id', authMiddleware, deleteAchievement);

export default router;
