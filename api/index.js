const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Student = require("../models/Student");

dotenv.config();

const app = express();
app.use(express.json());

/* Serve HTML */
app.use(express.static(path.join(__dirname, "../public")));

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log("MongoDB Error:", err));

/* READ */
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

/* CREATE */
app.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student Added" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE */
app.delete("/delete/:id", async (req, res) => {
  await Student.deleteOne({ studentId: req.params.id });
  res.json({ message: "Student Deleted" });
});

/* UPDATE */
app.put("/update/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId: req.params.id }, // find by studentId
      req.body,                     // update data from request body
      { new: true }                 // return the updated document
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student Not Found" });
    }
    res.json({ message: "Student Updated", student: updatedStudent });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Home */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
