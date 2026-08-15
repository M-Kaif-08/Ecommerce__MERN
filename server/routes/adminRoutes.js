import express from 'express'
import { getDashboardStats, getAllUsers, getUserById, updateUserById, deleteUserById } from '../controllers/adminController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { adminOnly } from '../middleware/adminOnly.js'

const router = express.Router();

router.get('/dashboard', verifyToken, adminOnly, getDashboardStats);
router.get('/users', verifyToken, adminOnly, getAllUsers);
router.get('/users/:id', verifyToken, adminOnly, getUserById);
router.put('/users/:id', verifyToken, adminOnly, updateUserById);
router.delete('/users/:id', verifyToken, adminOnly, deleteUserById);

export default router;