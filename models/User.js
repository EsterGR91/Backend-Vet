import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["STAFF", "ADMIN"], default: "STAFF" },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Evita recompilar el modelo en hot-reload / tests
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;