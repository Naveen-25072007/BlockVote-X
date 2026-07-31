import mongoose from "mongoose";

// =============================
// Candidate Schema
// =============================
const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    party: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    manifesto: {
      type: String,
      default: "",
    },

    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: true, // Each candidate gets its own ObjectId
  }
);

// =============================
// Election Schema
// =============================
const electionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Active", "Ended"],
      default: "Upcoming",
    },

    candidates: [candidateSchema],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Election", electionSchema);