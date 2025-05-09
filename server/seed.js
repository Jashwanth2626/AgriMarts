import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MarketData from './models/MarketData.js';
import { sampleMarketData } from './data/marketData.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bhoomi';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    try {
      // Clear existing data
      await MarketData.deleteMany({});
      
      // Insert sample data
      await MarketData.insertMany(sampleMarketData);
      
      console.log('Database seeded successfully');
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }); 