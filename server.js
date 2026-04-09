import express from 'express';
import cors from 'cors';
import { initDB } from './src/db/init.js';
import apiRoutes from './src/routes/api.js';
import { Logger } from "./src/services/logger.js"
const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(express.json({ limit: '50mb' }));

// Initialise DB without default checklist Seed
initDB();

app.use(Logger)

// API Routes mounting point
app.use('/api', apiRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({ "message": "API is running" })
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
