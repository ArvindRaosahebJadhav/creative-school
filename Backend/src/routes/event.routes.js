import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
import { upload } from '../middleware/upload.middleware.js';

// frontend sends event image under field name 'image'
router.post('/', authMiddleware, upload.single('image'), createEvent);
router.put('/:id', authMiddleware, upload.single('image'), updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;
