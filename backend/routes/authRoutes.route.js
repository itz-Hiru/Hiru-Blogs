import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.controller.js";
import { protect } from "../middleware/authMiddleware.middleware.js";

const router = express.Router();

router.post("/register", registerUser); // Register/ Signup User
router.post("/login", loginUser); // Login User
router.get("/profile", protect, getUserProfile); // Get logged-in user profile

export default router;
