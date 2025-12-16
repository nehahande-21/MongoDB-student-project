const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("../models/Student");

dotenv.config();

const app = express();
app.use(express.json());

/* MongoDB Connection */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

/* READ */
app.get("/api/students", async (req, res) => {
  await connectDB();
  const students = await Student.find();
  res.json(students);
});

/* CREATE */
app.post("/api/add", async (req, res) => {
  await connectDB();
  const student = new Student(req.body);
  await student.save();
  res.json({ message: "Student Added" });
});

/* DELETE */
app.delete("/api/delete", async (req, res) => {
  await connectDB();
  const { id } = req.query;
  await Student.deleteOne({ studentId: id });
  res.json({ message: "Student Deleted" });
});

/* Export for Vercel */
module.exports = app;
