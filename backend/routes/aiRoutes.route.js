import express from "express";
import {
  generateBlogPost,
  generateBlogPostIdeas,
  generateCommentReply,
  generatePostSummary,
} from "../controllers/aiController.controller.js";
import { protect } from "../middleware/authMiddleware.middleware.js";

const router = express.Router();

router.post("/generate/post", protect, generateBlogPost); // Generate blog post
router.post("/generate/ideas", protect, generateBlogPostIdeas); // Generate blog post ideas
router.post("/generate/reply", protect, generateCommentReply); //Generate reply for comments
router.post("/generate/summary", generatePostSummary); // Generate post summary

export default router;
