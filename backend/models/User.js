import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    studentId: {
      type: String,
      default: "",
      trim: true,
    },

    hasVoted: {
      type: Boolean,
      default: false,
    },

    votedElection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      default: null,
    },

    selectedCandidate: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);