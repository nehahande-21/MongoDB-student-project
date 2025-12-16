const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  subjects: {
    type: [String],   // Array of strings
    required: true
  },
  attendance: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
