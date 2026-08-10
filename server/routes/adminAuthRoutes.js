import express from 'express'
import { Login, Logout, CheckAuth } from '../controllers/adminAuthController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { adminOnly } from '../middleware/adminOnly.js'

const router = express.Router();

router.get('/check', verifyToken, adminOnly, CheckAuth);

router.post('/login', Login);
router.post('/logout', Logout);

export default router;