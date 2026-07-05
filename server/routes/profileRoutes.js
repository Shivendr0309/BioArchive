const express = require("express");

const {
  createProfile,
  getMyProfile,
  updateProfile,
  getPublicProfile,
  deleteProfile,
  toggleBookmark,
  getBookmarks,
  addToReadingHistory,
getReadingHistory,
} = require("../controllers/profileController");

const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

/* ==========================
   Create Profile
========================== */

router.post("/", protect, createProfile);

/* ==========================
   Logged-in User Profile
========================== */

router.get("/me", protect, getMyProfile);

/* ==========================
   Bookmarks
========================== */

// Toggle Bookmark

router.put(
  "/bookmark/:blogId",
  protect,
  toggleBookmark
);

// Get All Bookmarks

router.get(
  "/bookmarks",
  protect,
  getBookmarks
);

/* ==========================
   Update Profile
========================== */

router.put(
  "/",
  protect,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  updateProfile
);

/* ==========================
   Delete Profile
========================== */

router.delete("/", protect, deleteProfile);

/* ==========================
   Public Profile
   KEEP THIS LAST
========================== */
router.put(
  "/history/:blogId",
  protect,
  addToReadingHistory
);

router.get(
  "/history",
  protect,
  getReadingHistory
);
router.get("/:userId", getPublicProfile);

module.exports = router;