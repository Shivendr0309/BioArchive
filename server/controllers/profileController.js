const Profile = require("../models/Profile");
const User = require("../models/User");
const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");
// ==========================
// Create Profile
// ==========================

const createProfile = async (req, res) => {
  try {
    const {
      bio,
      github,
      linkedin,
      twitter,
      website,
      avatar,
    } = req.body;

    const existingProfile =
      await Profile.findOne({
        user: req.user._id,
      });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const profile = await Profile.create({
      user: req.user._id,
      bio,
      github,
      linkedin,
      twitter,
      website,
      avatar,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Get Logged-in User Profile
// ==========================

const getMyProfile = async (req, res) => {
  try {
    let profile =
      await Profile.findOne({
        user: req.user._id,
      }).populate(
        "user",
        "name email avatar"
      );

    // Auto-create profile if missing

    if (!profile) {
      profile = await Profile.create({
        user: req.user._id,
      });

      profile =
        await Profile.findById(
          profile._id
        ).populate(
          "user",
          "name email avatar"
        );
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Update Profile
// ==========================

const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user._id,
    });

    // Auto-create profile if it doesn't exist
    if (!profile) {
      profile = await Profile.create({
        user: req.user._id,
      });
    }

    // Update text fields
    const fields = [
      "bio",
      "github",
      "linkedin",
      "twitter",
      "website",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        profile[field] = req.body[field];
      }
    });

    // ==========================
    // Avatar Upload
    // ==========================

    if (
      req.files &&
      req.files.avatar &&
      req.files.avatar.length > 0
    ) {
      const avatarFile = req.files.avatar[0];

try {
  const ping = await cloudinary.api.ping();
  console.log("Cloudinary ping:", ping);
} catch (err) {
  console.log("Cloudinary ping failed:", err.message);
}
      const result = await cloudinary.uploader.upload(
  avatarFile.path,
  {
    folder: "BioArchive/Profile/Avatar",
  }
);

profile.avatar = result.secure_url;

await fs.remove(avatarFile.path);
    }

    // ==========================
    // Banner Upload
    // ==========================

    if (
      req.files &&
      req.files.banner &&
      req.files.banner.length > 0
    ) {
      const bannerFile = req.files.banner[0];

     const result = await cloudinary.uploader.upload(
  bannerFile.path,
  {
    folder: "BioArchive/Profile/Banner",
  }
);

profile.banner = result.secure_url;

await fs.remove(bannerFile.path);
    }

    await profile.save();

    const updatedProfile =
      await Profile.findById(
        profile._id
      ).populate(
        "user",
        "name email"
      );

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error(error);

    // Cleanup temporary files if upload fails
   try {
  if (req.files?.avatar?.[0]) {
    await fs.remove(req.files.avatar[0].path);
  }

  if (req.files?.banner?.[0]) {
    await fs.remove(req.files.banner[0].path);
  }
} catch (cleanupError) {
  console.error(cleanupError);
}

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ==========================
// Get Public Profile
// ==========================

const getPublicProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate(
      "user",
      "name email avatar"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Delete Profile
// ==========================

const deleteProfile = async (req, res) => {
  try {
    const profile =
      await Profile.findOneAndDelete({
        user: req.user._id,
      });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Profile deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Toggle Bookmark
// ==========================

const toggleBookmark = async (
  req,
  res
) => {
  try {
    const { blogId } = req.params;

    const blog =
      await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const user = await User.findById(
      req.user._id
    );

    const alreadyBookmarked =
      user.bookmarks.some(
        (id) =>
          id.toString() === blogId
      );

    if (alreadyBookmarked) {
      user.bookmarks =
        user.bookmarks.filter(
          (id) =>
            id.toString() !== blogId
        );

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Bookmark removed",
        data: user.bookmarks,
      });
    }

    user.bookmarks.push(blogId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Blog bookmarked",
      data: user.bookmarks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Get Bookmarked Blogs
// ==========================

const getBookmarks = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).populate({
      path: "bookmarks",
      populate: {
        path: "author",
        select: "name email",
      },
    });

    res.status(200).json({
      success: true,
      data: user.bookmarks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addToReadingHistory = async (
  req,
  res
) => {
  try {
    const { blogId } = req.params;

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          readingHistory: blogId,
        },
      }
    );

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          readingHistory: {
            $each: [blogId],
            $position: 0,
            $slice: 20,
          },
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "History updated",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getReadingHistory = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).populate({
      path: "readingHistory",
      populate: {
        path: "author",
        select: "name email",
      },
    });

    res.status(200).json({
      success: true,
      data: user.readingHistory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createProfile,
  getMyProfile,
  updateProfile,
  getPublicProfile,
  deleteProfile,
  toggleBookmark,
  getBookmarks,
  addToReadingHistory,
  getReadingHistory,
};