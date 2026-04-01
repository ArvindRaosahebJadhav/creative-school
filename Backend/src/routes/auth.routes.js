import express from 'express';
import { register, login, resetAdmin } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.post('/seed-admin', seedAdmin);
router.post('/reset-admin', resetAdmin);
// DEV debug endpoints
// router.get('/users', listUsers);
// router.get("/db-status", dbStatus);

export default router;
