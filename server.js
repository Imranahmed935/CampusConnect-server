const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const { admissionRouter } = require("./Controllers/admission.controller");
const { reviewRouter } = require("./Controllers/review.controller");



require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/admission", admissionRouter);
app.use("/api/reviews", reviewRouter);


app.get("/", (req, res) => {
  res.send("The server is going on!");
});

app.listen(port, () => {
  connectDB();
  console.log("mongodb connected!");
  console.log(`Server running on port ${port}`);
});
