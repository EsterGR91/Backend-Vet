import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    scheduled_for: { type: Date, required: true },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    notes: String,

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
