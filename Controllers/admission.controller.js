import express from "express";
import { Admission } from "../Models/admission.modal.js";

export const admissionRouter = express.Router();

admissionRouter.post("/", async (req, res) => {
  try {
    const collegeData = req.body;

    if (!collegeData.email || !collegeData.selectedCollege) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const data = await Admission.create(collegeData);

    res.status(201).json({
      success: true,
      message: "College Admission Created Successfully",
      data,
    });
  } catch (error) {
    console.error("❌ Error creating admission:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

admissionRouter.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const emailData = await Admission.findOne({ email });
    if (!emailData) {
      return res
        .status(404)
        .json({ message: "No admission found for this email" });
    }
    res.status(200).json({ data: emailData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

admissionRouter.put("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;

    const updated = await Admission.findOneAndUpdate(
      { email },
      updatedData,
      { new: true } // return updated document
    );

    if (!updated) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});
