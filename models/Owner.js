import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, maxlength: 80 },
    last_name: { type: String, required: true, maxlength: 120 },
    email: { type: String, unique: true },
    phone: String,
    address: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Owner", OwnerSchema);

