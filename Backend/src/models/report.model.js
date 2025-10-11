import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Citizen } from "./citizen.model.js";
import { Worker } from "./worker.model.js";

const reportSchema = new Schema(
  {
    citizen: {
      type: mongoose.Types.ObjectId,
      ref: "Citizen",
    },
    worker: {
      type: mongoose.Types.ObjectId,
      ref: "Worker",
    },
    isSegregated: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      enum: ['Point'],
      required: true,
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    image: {
      type: [String],
      required: [true, "Photo Of the Waste is Required...!!"],
    },
    video: {
      type: String,
    },
    wasteType: {
      type: String,
      enum: [
        "GENERAL_WASTE",
        "ORGANIC_WET",
        "RECYCLABLE_DRY",
        "E_WASTE",
        "CONSTRUCTION_DEBRIS",
        "BULKY_ITEM",
      ],
      default: "GENERAL_WASTE",
      required: [true, "Waste type is required"],
    },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

reportSchema.index({location:"2dsphere"})

export const Report = mongoose.model("Report", reportSchema);
