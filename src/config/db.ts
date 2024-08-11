import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      // useNewUrlParser and useUnifiedTopology are now default
    });
    console.log('MongoDB Connected');
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error('Unknown error occurred during MongoDB connection');
    }
    process.exit(1);
  }
};

export default connectDB;
