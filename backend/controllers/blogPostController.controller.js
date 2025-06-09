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
    const status = req.query.status || "published";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Determine filter for main posts response
    let filter = {};

    if (status === "published") filter.isDraft = false;
    else if (status === "draft") filter.isDraft = true;

    // Fetch paginated posts
    const posts = await BlogPost.find(filter)
      .populate("author", "name profileImageUrl")
      .sort({ updateAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count totals for pagination and tab counts
    const [totalCount, allCount, publishedCount, draftCount] =
      await Promise.all([
        BlogPost.countDocuments(filter), // for pagination count tab
        BlogPost.countDocuments(),
        BlogPost.countDocuments({ isDraft: false }),
        BlogPost.countDocuments({ isDraft: true }),
      ]);

    res.status(200).json({
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allCount,
        published: publishedCount,
        draft: draftCount,
      },
    });
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
    const post = await BlogPost.findById(req.params.id);

    // Check if blog post is available for Id
    if (!post) {
      return res.status(400).json({
        message: "Could not found blog post for Id",
      });
    }

    // Check if user is admin or not
    if (
      post.author.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(400)
        .json({ message: "You have no permissions to update post" });
    }

    const updateData = req.body;

    // Update slug if title updated
    if (updateData.title) {
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    // Update post
    const updatePost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Description => Delete blog post
// Route       => DELETE /api/posts/:id/delete
// Access      => Private | Admin Only
export const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    // Check if post is available for the Id
    if (!post) {
      return res
        .status(400)
        .json({ message: "Could not find the blog post for Id" });
    }

    // Delete post
    await post.deleteOne();
    res.status(200).json({ message: "Blog post deleted" });
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
