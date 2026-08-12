import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', adminAuthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`)
})