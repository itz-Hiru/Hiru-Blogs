import mongoose from "mongoose";
import BlogPost from "../models/BlogPost.model.js";

// Description => Create new blog post
// Route       => POST /api/posts/create
// Access      => Private | Admin Only
export const createPost = async (req, res) => {
  try {
    const { title, content, coverImageUrl, tags, isDraft, generatedByAI } =
      req.body;

    // Slug
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // Create new blog post
    const newPost = new BlogPost({
        title,
        slug,
        content,
        coverImageUrl,
        tags,
        author: req.user._id,
        isDraft,
        generatedByAI,
    });

    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Get all blog posts
// Route       => GET /api/posts/
// Access      => Public
export const getAllPosts = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Get blog post by slug
// Route       => GET /api/posts/slug/:slug
// Access      => Public
export const getPostBySlug = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Get blog post by tag
// Route       => GET /api/posts/tag/:tag
// Access      => Public
export const getPostByTag = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Get top blog posts
// Route       => GET /api/posts/trending
// Access      => Public
export const getTopPosts = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Update blog post
// Route       => PUT /api/posts/:id/update
// Access      => Private | Admin Only
export const updatePost = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Delete blog post
// Route       => DELETE /api/posts/:id/delete
// Access      => Private | Admin Only
export const deletePost = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => update blog post views
// Route       => POST /api/posts/:id/view
// Access      => Public
export const incrementView = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Search blog post
// Route       => GET /api/posts/search
// Access      => Public
export const searchPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Like blog post
// Route       => POST /api/posts/:id/like
// Access      => Private
export const likePost = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
