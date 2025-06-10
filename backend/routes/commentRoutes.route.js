import express from "express";
import {
  addComment,
  getCommentByPost,
  deleteComment,
  getAllComments,
} from "../controllers/commentController.controller.js";
import { protect } from "../middleware/authMiddleware.middleware.js";

const router = express.Router();

router.post("/:postId/add", protect, addComment); // Add comment
router.get("/:postId", getCommentByPost); // Get all comments for a selected post
router.get("/", getAllComments); // Get all comments
router.delete("/:commentId/delete", protect, deleteComment); // Delete an existing comment

export default router;
