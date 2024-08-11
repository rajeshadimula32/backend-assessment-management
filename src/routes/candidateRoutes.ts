import express from 'express';
import {
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidates,
  getCandidateById,
} from '../controllers/candidateController';
import  authMiddleware  from '../middleware/authMiddleware';
import { authRole } from '../middleware/authRole';

const router = express.Router();

router.post('/', authMiddleware, authRole(['Admin']), createCandidate);  // Admin only
router.put('/:id', authMiddleware, authRole(['Admin']), updateCandidate);  // Admin only
router.delete('/:id', authMiddleware, authRole(['Admin']), deleteCandidate);  // Admin only

// Both Admin and Delivery Admin can access these routes
router.get('/', authMiddleware, authRole(['Admin', 'DeliveryAdmin']), getCandidates);
router.get('/:id', authMiddleware, authRole(['Admin', 'DeliveryAdmin']), getCandidateById);

export default router;
