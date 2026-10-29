import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'HP Gas Dealership Operations Management System',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.listen(port, () => {
  console.log(`[HP Gas Management Server] running on http://localhost:${port}`);
});
