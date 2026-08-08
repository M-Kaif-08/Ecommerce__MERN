import express from 'express'
import { SignUp, VerifyEmail, Login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', SignUp);
router.post('/verify-email', VerifyEmail);
router.post('/login', Login);

export default router;