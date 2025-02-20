import mongoose from "mongoose";

const applydonor = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },

    bloodgroup: {
      type: Object,
      required: [true, "Blood group is require"],
    },
    DOB: {
      type: Date,
      required: [true, "DOB group is require"],
    },
    address: {
      type: String,
      required: true,
    },

    fitcer: {
      type: Buffer,
    },
    card: {
      type: Buffer,
    },
    question1: {
      type: String,
      required: true,
      trim: true,
    },
    question2: {
      type: String,
      required: true,
      trim: true,
    },
    question3: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ApplyDonor", applydonor);
