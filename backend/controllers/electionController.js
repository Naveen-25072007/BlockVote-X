import Election from "../models/Election.js";

// ==========================================
// Create Election
// ==========================================
export const createElection = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const now = new Date();

    let status = "Upcoming";

    if (
      now >= new Date(startDate) &&
      now <= new Date(endDate)
    ) {
      status = "Active";
    } else if (now > new Date(endDate)) {
      status = "Completed";
    }

    const election = await Election.create({
      title,
      description,
      startDate,
      endDate,
      status,
      candidates: [],
      createdBy: req.user._id,
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

// ==========================================
// Get All Elections
// ==========================================
export const getAllElections = async (req, res) => {
  try {

    const elections = await Election.find().sort({
      createdAt: -1,
    });

    const now = new Date();

    for (const election of elections) {

      let status = "Upcoming";

      if (
        now >= new Date(election.startDate) &&
        now <= new Date(election.endDate)
      ) {

        status = "Active";

      } else if (now > new Date(election.endDate)) {

        status = "Completed";

      }

      if (election.status !== status) {

        election.status = status;

        await election.save();

      }

    }

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

// ==========================================
// Get Election By ID
// ==========================================
export const getElectionById = async (req, res) => {
  try {

    const election = await Election.findById(req.params.id);

    if (!election) {

      return res.status(404).json({
        success: false,
        message: "Election not found.",
      });

    }

    const now = new Date();

    let status = "Upcoming";

    if (
      now >= new Date(election.startDate) &&
      now <= new Date(election.endDate)
    ) {

      status = "Active";

    } else if (now > new Date(election.endDate)) {

      status = "Completed";

    }

    if (election.status !== status) {

      election.status = status;

      await election.save();

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

// ==========================================
// Update Election
// ==========================================
export const updateElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found.",
      });
    }

    election.title = req.body.title ?? election.title;
    election.description = req.body.description ?? election.description;
    election.startDate = req.body.startDate ?? election.startDate;
    election.endDate = req.body.endDate ?? election.endDate;
    election.status = req.body.status ?? election.status;

    await election.save();

    res.status(200).json({
      success: true,
      message: "Election updated successfully.",
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

// ==========================================
// Delete Election
// ==========================================
export const deleteElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found.",
      });
    }

    await Election.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Election deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};