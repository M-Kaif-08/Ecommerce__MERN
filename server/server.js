import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import adminAuthRoutes from './routes/adminAuthRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminOrderRoutes from './routes/adminOrderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [process.env.CLIENT_URL, process.env.ADMIN_URL], credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', adminAuthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`App listening on port ${port}`)
})