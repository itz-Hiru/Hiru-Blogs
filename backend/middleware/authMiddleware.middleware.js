import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(400).json({ message: "Not authorized. No token found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Token failed", error: error.message });
  }
};

// Middleware to protect admin only routes
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Access denied. This route is only for admins." });
  }
};
