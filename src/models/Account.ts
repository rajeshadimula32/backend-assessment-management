import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'DeliveryAdmin';
}

const AccountSchema: Schema = new Schema<IAccount>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'DeliveryAdmin'] },
});

const Account = mongoose.model<IAccount>('Account', AccountSchema);
export default Account;
