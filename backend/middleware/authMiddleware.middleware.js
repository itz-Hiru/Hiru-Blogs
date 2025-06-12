import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  } else {
    return res.status(401).json({ message: "Not authorized. Token missing." });
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
