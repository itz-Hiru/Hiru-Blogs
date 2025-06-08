import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Description => Register/ Signup New User
// Route       => POST /api/auth/register
// Access      => Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, bio, adminAccessToken } =
      req.body;

    const existUserCheck = await User.findOne({ email });
    if (existUserCheck) {
      return res
        .status(400)
        .json({ message: "User already exists with entered email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check admin access token is correct or not
    let role = "member";
    if (
      adminAccessToken &&
      adminAccessToken == process.env.ADMIN_ACCESS_TOKEN
    ) {
      role = "admin";
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      bio,
      role,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description => Login User
// Route       => POST /api/auth/login
// Access      => Public
export const loginUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description => Get logged-in User profile details
// Route       => GET /api/auth/profile
// Access      => Private
export const getUserProfile = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
