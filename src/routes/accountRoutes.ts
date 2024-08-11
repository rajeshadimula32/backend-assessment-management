import express from 'express';
import { registerAccount, loginAccount, getAccountDetails } from '../controllers/accountController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.get('/me', authMiddleware, getAccountDetails);

export default router;
