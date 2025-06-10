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
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name profileImageUrl")
      .populate("post", "coverImageUrl")
      .sort({ createdAt: 1 }); // Replies comes in order

    // Create a map for commentId => comment object
    const commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject(); // Convert from mongoose document to plain object
      comment.replies = []; // Initialize replies array
      commentMap[comment._id] = comment;
    });

    // Nest replies under their comments
    const nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.status(200).json(nestedComments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description => Get all comments
// Route       => GET /api/comments/
// Access      => Public
export const getAllComments = async (req, res) => {
  try {
    // Fetch all comments with author populated
    const comments = await Comment.find()
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 }); // Replies comes in order

    // Create a map for commentId => comment object
    const commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject(); // Convert from mongoose document to plain object
      comment.replies = []; // Initialize replies array
      commentMap[comment._id] = comment;
    });

    // Nest replies under their comments
    const nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.status(200).json(nestedComments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Description => Delete a selected comment
// Route       => DELETE /api/comments/:commentId/delete
// Access      => Private
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    // Check if comment is available
    if (!comment) {
      res.status(400).json({ message: "Comment not found" });
    }

    // Delete comment
    await Comment.deleteOne({ _id: commentId });

    // Delete all replies
    await Comment.deleteMany({ parentComment: commentId });

    res.status(200).json({ message: "Comment and replies deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
