import express from 'express'
import { getProducts, getProductById, CreateProduct, UpdateProduct, DeleteProduct } from '../controllers/productController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { adminOnly } from '../middleware/adminOnly.js'
import upload from '../middleware/upload.js'

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, adminOnly, upload.single("image"), CreateProduct);
router.put('/:id', verifyToken, adminOnly, upload.single("image"), UpdateProduct);
router.delete('/:id', verifyToken, adminOnly, DeleteProduct);

export default router;