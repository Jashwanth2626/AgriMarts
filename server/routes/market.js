import express from "express";
import MarketData from "../models/MarketData.js";

const router = express.Router();

// Get all market data
router.get("/getall", async (req, res) => {
  try {
    const marketData = await MarketData.find();
    res.status(200).json(marketData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Add new market item
router.post("/add", async (req, res) => {
  try {
    const newMarketItem = new MarketData(req.body);
    const savedItem = await newMarketItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update market item
router.put("/update/:id", async (req, res) => {
  try {
    const updatedItem = await MarketData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete market item
router.delete("/delete/:id", async (req, res) => {
  try {
    await MarketData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get market items by category
router.get("/category/:category", async (req, res) => {
  try {
    const items = await MarketData.find({ category: req.params.category });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Search market items
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const items = await MarketData.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router; 