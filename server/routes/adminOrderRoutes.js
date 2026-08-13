import express from 'express'
import { getAllOrders, getOrderById, updateOrderStatus } from '../controllers/adminOrderController.js'
import { verifyToken } from '../middleware/verifyToken.js';
import { adminOnly } from '../middleware/adminOnly.js';

const router = express.Router();

router.get('/', verifyToken, adminOnly, getAllOrders);
router.get('/:id', verifyToken, adminOnly, getOrderById);
router.put('/:id', verifyToken, adminOnly, updateOrderStatus);

export default router;