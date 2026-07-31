import Election from "../models/Election.js";

// Create Election
export const createElection = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      candidates,
    } = req.body;

    // Basic Validation
    if (
      !title ||
      !description ||
      !startDate ||
      !endDate ||
      !candidates ||
      candidates.length < 2
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields and at least 2 candidates.",
      });
    }

    const election = await Election.create({
      title,
      description,
      startDate,
      endDate,
      candidates,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Election created successfully.",
      election,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Elections
export const getAllElections = async (req, res) => {
  try {
    const elections = await Election.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: elections.length,
      elections,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Election
export const getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found.",
      });
    }

    res.status(200).json({
      success: true,
      election,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};