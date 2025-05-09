import mongoose from "mongoose";

const marketDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Tractors', 'Harvesters', 'Plows', 'Seeders', 'Sprayers', 'Other'],
    },
    condition: {
      type: String,
      required: true,
      enum: ['New', 'Like New', 'Good', 'Fair'],
    },
    location: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const MarketData = mongoose.model("MarketData", marketDataSchema);
export default MarketData; 