import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    }, // Blog post (Primary key)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Blog post author
    content: { type: String, required: true }, // Comment
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    }, // For threads of multiple comments
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
