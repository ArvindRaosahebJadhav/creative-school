import express from 'express';
import {
  getSchoolInfo,
  getInfoByKey,
  setSchoolInfo,
  deleteSchoolInfo,
} from '../controllers/school-info.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getSchoolInfo);
router.get('/:key', getInfoByKey);
router.post('/', authMiddleware, setSchoolInfo);
router.delete('/:key', authMiddleware, deleteSchoolInfo);

export default router;
