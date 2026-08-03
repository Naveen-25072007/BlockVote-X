import Election from "../models/Election.js";

// ======================================
// Add Candidate
// ======================================
export const addCandidate = async (req, res) => {
  try {
    const { electionId } = req.params;
    const { name, party, image, manifesto } = req.body;

    if (!name || !party) {
      return res.status(400).json({
        success: false,
        message: "Candidate name and party are required.",
      });
    }

    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found.",
      });
    }

    election.candidates.push({
      name,
      party,
      image: image || "",
      manifesto: manifesto || "",
    });

    await election.save();

    res.status(201).json({
      success: true,
      message: "Candidate added successfully.",
      candidates: election.candidates,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Get Candidates
// ======================================
export const getCandidates = async (req, res) => {
  try {
    const { electionId } = req.params;

    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found.",
      });
    }

    res.status(200).json({
      success: true,
      candidates: election.candidates,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Update Candidate
// ======================================
export const updateCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { name, party, image, manifesto } = req.body;

    const election = await Election.findOne({
      "candidates._id": candidateId,
    });

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found.",
      });
    }

    const candidate = election.candidates.id(candidateId);

    if (name) candidate.name = name;
    if (party) candidate.party = party;
    if (image !== undefined) candidate.image = image;
    if (manifesto !== undefined) candidate.manifesto = manifesto;

    await election.save();

    res.status(200).json({
      success: true,
      message: "Candidate updated successfully.",
      candidate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Delete Candidate
// ======================================
export const deleteCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const election = await Election.findOne({
      "candidates._id": candidateId,
    });

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found.",
      });
    }

    election.candidates.pull(candidateId);

    await election.save();

    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};