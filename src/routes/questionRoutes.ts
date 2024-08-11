import express from 'express';
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  getQuestionById,
} from '../controllers/questionController';
import  authMiddleware  from '../middleware/authMiddleware';
import { authRole } from '../middleware/authRole';

const router = express.Router();

router.post('/', authMiddleware, authRole(['Admin']), createQuestion);  // Admin only
router.put('/:id', authMiddleware, authRole(['Admin']), updateQuestion);  // Admin only
router.delete('/:id', authMiddleware, authRole(['Admin']), deleteQuestion);  // Admin only

router.get('/', authMiddleware, authRole(['Admin']), getQuestions);  // Admin only
router.get('/:id', authMiddleware, authRole(['Admin']), getQuestionById);  // Admin only

export default router;
