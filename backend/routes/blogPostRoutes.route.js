import express from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostBySlug,
    getPostByTag,
    getTopPosts,
    incrementView,
    likePost,
    searchPost,
    updatePost,
} from "../controllers/blogPostController.controller.js";
import { adminOnly, protect } from "../middleware/authMiddleware.middleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createPost); // Create new blog
router.get("/", getAllPosts); // Get all blog posts
router.get("/slug/:slug", getPostBySlug); // Get blog posts by slug
router.put("/:id/update", protect, adminOnly, updatePost); // Update an existing blog post
router.delete("/:id/delete", protect, adminOnly, deletePost); // Delete an existing blog post
router.get("/tag/:tag", getPostByTag); // Get blog posts by tag
router.get("/search", searchPost); // Search blog post
router.post("/:id/view", incrementView); // Update views
router.post("/:id/like", protect, likePost); // Like blog posts
router.get("/trending", getTopPosts); // Get trending posts

export default router;
