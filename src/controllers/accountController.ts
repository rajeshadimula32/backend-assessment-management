import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from '../models/Account';

// Register a new account
export const registerAccount = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new Account({ username, email, password: hashedPassword, role });
    await newAccount.save();

    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Login and generate JWT token
export const loginAccount = async (req: Request, res: Response) => {
  try {
    console.log("api req for login Account")
    const { email, password } = req.body;
    console.log(`email ${email}`)
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET || 'yourSecretKey',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get account details
export const getAccountDetails = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
      }
  
      const account = await Account.findById(req.user.id).select('-password');
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };
