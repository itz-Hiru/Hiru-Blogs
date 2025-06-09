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

    // Check if user is already exist with the email entered
    const existUserCheck = await User.findOne({ email });
    if (existUserCheck) {
      return res
        .status(400)
        .json({ message: "User already exists with entered email" });
    }

    // Hash password
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

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      bio,
      role,
    });

    // Return user data
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
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check email is valid
    if (!user) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Return user data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
      bio: user.bio,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description => Get logged-in User profile details
// Route       => GET /api/auth/profile
// Access      => Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // Check if user exists
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    // Return user
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
