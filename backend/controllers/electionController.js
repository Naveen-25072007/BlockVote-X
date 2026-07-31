import Election from "../models/Election.js";

// ==============================
// Create Election
// ==============================
export const createElection = async (req, res) => {
  try {
    const election = await Election.create({
      ...req.body,
      createdBy: req.user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Election created successfully",
      election,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Elections
// ==============================
export const getAllElections = async (req, res) => {
  try {
    const elections = await Election.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      elections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Election By ID
// ==============================
export const getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    res.status(200).json({
      success: true,
      election,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Election
// ==============================
export const updateElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Election updated successfully",
      election,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Election
// ==============================
export const deleteElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndDelete(
      req.params.id
    );

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Election deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};