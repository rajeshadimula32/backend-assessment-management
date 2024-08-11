import { Request, Response } from 'express';
import Candidate from '../models/Candidate';

// Get all candidates with pagination, filtering, and sorting
export const getCandidates = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sort = 'createdDate', order = 'asc', search = '' } = req.query;

    const candidates = await Candidate.find({ 
      name: { $regex: search as string, $options: 'i' }, 
      isDeleted: false 
    })
      .sort({ [sort as string]: order === 'asc' ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Candidate.countDocuments({ name: { $regex: search as string, $options: 'i' }, isDeleted: false });

    res.status(200).json({ data: candidates, total });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create a new candidate
export const createCandidate = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const newCandidate = new Candidate({ name, email });
    await newCandidate.save();

    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update an existing candidate
export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Soft delete a candidate
export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


export const getCandidateById = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};