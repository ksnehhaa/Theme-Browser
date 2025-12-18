import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration for local frontend
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true,
}));

// ✅ Body parser configuration
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    // ✅ Start server locally
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/uploads', uploadRoutes);

// ✅ Default test route
app.get('/api', (req, res) => {
  res.send('🌐 API is running...');
});