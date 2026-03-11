import express from 'express';
import { getAllData } from '../controllers/dataController.js';
import { updateChecklist } from '../controllers/checklistController.js';
import { createTrade, deleteTrade } from '../controllers/tradesController.js';
import { createTemplate, deleteTemplate } from '../controllers/templatesController.js';
import { updateSettings } from '../controllers/settingsController.js';
import { login, register } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Auth Routes (Public)
router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected Routes (Require Login)
router.use(authMiddleware);

router.get('/data', getAllData);
router.put('/checklist', updateChecklist);
router.post('/trades', createTrade);
router.delete('/trades/:id', deleteTrade);
router.post('/templates', createTemplate);
router.delete('/templates/:id', deleteTemplate);
router.put('/settings', updateSettings);

export default router;
