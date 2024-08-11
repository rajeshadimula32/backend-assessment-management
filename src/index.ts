import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import candidateRoutes from './routes/candidateRoutes';
import questionRoutes from './routes/questionRoutes';
import accountRoutes from './routes/accountRoutes';

dotenv.config();

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/accounts', accountRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
