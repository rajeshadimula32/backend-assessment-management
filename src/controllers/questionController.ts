import { Request, Response } from 'express';
import Question from '../models/Question';

// Get all questions with pagination, filtering, and sorting
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sort = 'lastUpdated', order = 'asc', search = '', tags = '' } = req.query;

    const tagFilter = tags ? { tags: { $in: (tags as string).split(',') } } : {};
    const textFilter = { text: { $regex: search as string, $options: 'i' } };

    const questions = await Question.find({ ...tagFilter, ...textFilter })
      .sort({ [sort as string]: order === 'asc' ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Question.countDocuments({ ...tagFilter, ...textFilter });

    res.status(200).json({ data: questions, total });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create a new question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { text, options, correctOption, marks, negativeMarking, tags } = req.body;

    const newQuestion = new Question({
      text,
      options,
      correctOption,
      marks,
      negativeMarking,
      tags,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update an existing question
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, options, correctOption, marks, negativeMarking, tags } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { text, options, correctOption, marks, negativeMarking, tags, lastUpdated: new Date() },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a question
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


export const getQuestionById = async (req: Request, res: Response) => {
    try {
      const question = await Question.findById(req.params.id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  