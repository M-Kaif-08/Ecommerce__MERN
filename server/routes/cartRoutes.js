import express from 'express'
import { addToCart, getCart, updateItemQuantity, removeFromCart, clearChart } from '../controllers/cartController.js'
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, getCart);
router.put('/:productId', verifyToken, updateItemQuantity);
router.delete('/:productId', verifyToken, removeFromCart);
router.delete('/', verifyToken, clearChart);

export default router;