import express from 'express'
import { getDashboardStats } from '../controllers/adminController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { adminOnly } from '../middleware/adminOnly.js'

const router = express.Router();

router.get('/dashboard', verifyToken, adminOnly, getDashboardStats);

export default router;