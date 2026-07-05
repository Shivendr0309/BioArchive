const express = require("express");

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
  getMyBlogs,
  getBlogsByUser,
  getLatestBlog,
  getCategoryStats,
  getTopAuthors,
} = require("../controllers/blogController");

const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// ==========================
// Public Routes
// ==========================

// Get all blogs
router.get("/", getAllBlogs);

// Get logged-in user's blogs
// IMPORTANT: Keep this ABOVE "/:id"
router.get("/my/blogs", protect, getMyBlogs);
router.get("/categories/stats", getCategoryStats);

router.get("/authors/top", getTopAuthors);
// Get single blog

router.get("/latest", getLatestBlog);
router.get("/user/:userId", getBlogsByUser);
router.get("/:id", getBlogById);
// ==========================
// Protected Routes
// ==========================

// Create blog
router.post(
  "/",
  protect,
  upload.single("image"),
  createBlog
);

// Update blog
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateBlog
);

// Delete blog
router.delete(
  "/:id",
  protect,
  deleteBlog
);

// Like / Unlike blog
router.put(
  "/:id/like",
  protect,
  toggleLikeBlog
);

module.exports = router;