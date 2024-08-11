import mongoose, { Document, Schema } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  email: string;
  createdDate: Date;
  isDeleted: boolean;
}

const CandidateSchema: Schema = new Schema<ICandidate>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdDate: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const Candidate = mongoose.model<ICandidate>('Candidate', CandidateSchema);
export default Candidate;
