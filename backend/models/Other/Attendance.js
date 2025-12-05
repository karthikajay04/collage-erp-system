const mongoose = require("mongoose");

const Attendance = new mongoose.Schema({
  enrollmentNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  isPresent: {
    type: Boolean,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendance", Attendance);
