import mongoose from "mongoose";

const MedicalRecordSchema = new mongoose.Schema(
  {
    record_date: { type: Date, default: Date.now },
    reason: String,
    symptoms: String,
    diagnosis: String,
    treatment: String,
    vet_notes: String,

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MedicalRecord", MedicalRecordSchema);
