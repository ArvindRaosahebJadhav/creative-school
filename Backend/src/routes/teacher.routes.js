import express from 'express';
import {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacher.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getTeachers);
router.get('/:id', getTeacherById);
router.post('/', authMiddleware, upload.single('image'), createTeacher);
router.put('/:id', authMiddleware, upload.single('image'), updateTeacher);
router.delete('/:id', authMiddleware, deleteTeacher);

export default router;
