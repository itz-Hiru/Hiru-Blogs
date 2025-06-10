import Comment from "../models/Comment.model.js";
import BlogPost from "../models/BlogPost.model.js";

// Description => Add new comment
// Route       => POST /api/comments/:postId/add
// Access      => Private
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    // Check if blog post is exists
    const post = await BlogPost.findById(postId);
    if (!post) {
        return res.status(400).json({ message: "Could not found the post" });
    }

    // Create comment
    const comment = await Comment.create({
        post: postId,
        author: req.user._id,
        content,
        parentComment: parentComment || null,
    });

    await comment.populate("author", "name profileImageUrl");

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description => Get comments for selected blog post
// Route       => GET /api/comments/:postId
// Access      => Public
export const getCommentByPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description => Get all comments
// Route       => GET /api/comments/
// Access      => Public
export const getAllComments = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description => Delete a selected comment
// Route       => DELETE /api/comments/:commentId/delete
// Access      => Private
export const deleteComment = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
