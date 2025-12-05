const express = require("express");
const router = express.Router();
const Attendance = require("../models/Other/Attendance");

router.post("/addAttendance", async (req, res) => {
  try {
    const { attendanceData } = req.body;
    await Attendance.insertMany(attendanceData);
    const data = {
      success: true,
      message: "Attendance Added!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/getAttendance", async (req, res) => {
  try {
    let attendance = await Attendance.find(req.body);
    if (!attendance) {
      return res
        .status(400)
        .json({ success: false, message: "No Attendance Found" });
    }
    const data = {
      success: true,
      message: "Attendance Found!",
      attendance,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
