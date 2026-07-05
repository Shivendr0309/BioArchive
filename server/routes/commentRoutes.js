const express = require("express");

const {
  addComment,
  getCommentsByBlog,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");

const protect = require("../middleware/auth");

const router = express.Router();

// Add Comment
router.post("/:blogId", protect, addComment);

// Get All Comments For A Blog
router.get("/:blogId", getCommentsByBlog);
router.put(
  "/:commentId",
  protect,
  updateComment
);
// Delete Comment
router.delete("/:commentId", protect, deleteComment);

module.exports = router;