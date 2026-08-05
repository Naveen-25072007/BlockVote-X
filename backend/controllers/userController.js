import User from "../models/User.js";
import Vote from "../models/Vote.js";

// ===============================================
// Get Logged-in User Profile
// ===============================================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const totalVotes = await Vote.countDocuments({
      student: req.user._id,
    });

    res.status(200).json({
      success: true,
      user,
      statistics: {
        totalVotes,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================================
// Get All Students
// ===============================================
export const getAllStudents = async (req, res) => {
  try {

    const students = await User.find({
      role: "student",
    }).select("-password");

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================================
// Verify Student
// ===============================================
export const verifyStudent = async (req, res) => {
  try {

    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    student.isVerified = true;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student verified successfully.",
      student,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};