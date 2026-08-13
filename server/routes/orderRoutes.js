import express from 'express'
import { createOrder, getMyOrders, getOrderById } from '../controllers/orderController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getMyOrders);
router.get('/:id', verifyToken, getOrderById);

export default router;