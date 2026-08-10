import express from 'express'
import { CreateProduct } from '../controllers/productController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { adminOnly } from '../middleware/adminOnly.js'
import upload from '../middleware/upload.js'

const router = express.Router();

router.post('/', verifyToken, adminOnly, upload.single("image"), CreateProduct)

export default router;