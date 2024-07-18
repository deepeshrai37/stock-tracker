import express ,{ Request, Response } from 'express';
import mongoose from 'mongoose';
import fetchData from './services/fetchData';
import Stock from './models/Stock';
import rateLimit from 'express-rate-limit';
import cors from 'cors'




const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect("YOUR_MONGOURL");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

// Rate limiter middleware for API routes
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', apiLimiter);

fetchData();

app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ timestamp: -1 }).limit(20);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
