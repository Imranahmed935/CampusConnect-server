import express from "express";
import { Review } from "../Models/review.modal.js";


export const reviewRouter = express.Router();

reviewRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (!data.rating || !data.feedback) {
      return res
        .status(400)
        .json({ success: false, message: "Rating and feedback are required." });
    }

    data.rating = Number(data.rating);
    const review = await Review.create(data);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

reviewRouter.get("/", async (req, res) => {
  try {
    const reviewData = await Review.find();
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviewData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
});
