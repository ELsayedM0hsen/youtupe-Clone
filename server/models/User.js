import mongoose from "mongoose";

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: { type: String },
    subscribers: { type: Number, default: 0 },
    subscriberedUser: { type: [String] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
