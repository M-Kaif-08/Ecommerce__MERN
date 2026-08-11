import express from 'express'
import { getCart, addToCart } from '../controllers/cartController.js'
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, getCart);

export default router;