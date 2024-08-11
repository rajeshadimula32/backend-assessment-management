import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
  negativeMarking: number;
  tags: string[];
  lastUpdated: Date;
}

const QuestionSchema: Schema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: { 
    type: [String], 
    required: true, 
    validate: (v: string[]) => v.length === 4 
  },
  correctOption: { type: Number, required: true },
  marks: { type: Number, required: true },
  negativeMarking: { type: Number, default: 0 },
  tags: { type: [String], index: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
