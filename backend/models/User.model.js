import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User name
    email: { type: String, required: true, unique: true }, // User email (Primary Key)
    password: { type: String, required: true }, // Password
    profileImageUrl: { type: String, default: null }, // User profile picture
    bio: { type: String, default: "" }, // Optional short Bio
    role: { type: String, enum: ["admin", "member"], default: "member" }, // Role admin or member
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
