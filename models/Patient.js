import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: String,
    sex: { type: String, enum: ["M", "F", "U"], default: "U" },
    birth_date: Date,
    weight_kg: Number,
    color: String,
    microchip_id: String,
    notes: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", PatientSchema);
