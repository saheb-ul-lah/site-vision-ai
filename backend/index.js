import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path'; // <--- WAS MISSING
import fs from 'fs';     // <--- WAS MISSING
import analyzeRoutes from './routes/analyzeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Ensure MONGO_URI is set in your .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/analyze', analyzeRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Site Vision AI API is running...');
});

// Ensure temp directory exists for screenshots
const tempDir = path.resolve('temp');
if (!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir);
    console.log('📁 Created temp directory for screenshots');
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});