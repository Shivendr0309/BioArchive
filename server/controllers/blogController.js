const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");
// ==========================
// Create Blog
// ==========================
const createBlog = async (req, res) => {
  try {
    const { title, content, category,status="published" } = req.body;

let tags = [];

if (req.body.tags) {
  try {
    tags = JSON.parse(req.body.tags);
  } catch {
    tags = [];
  }
}

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "BioArchive/Blogs",
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;

      // Delete temporary local file
      await fs.remove(req.file.path);
    }

    const blog = await Blog.create({
  title,
  content,
  category,
  status,
  tags,
  image: imageUrl,
  imagePublicId,
  author: req.user._id,
});


await blog.populate("author", "name email avatar");
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);

    if (req.file) {
      await fs.remove(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Get All Blogs
// ==========================
const getAllBlogs = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Search
    const search = req.query.search || "";

const searchFilter = {
  status: "published",

  $or: [
    {
      title: {
        $regex: search,
        $options: "i",
      },
    },
    {
      content: {
        $regex: search,
        $options: "i",
      },
    },
    {
      tags: {
        $regex: search,
        $options: "i",
      },
    },
    {
      category: {
        $regex: search,
        $options: "i",
      },
    },
  ],
};
// ==========================
// Get Latest Blog
// ==========================

    // Sorting
    const sortOption =
      req.query.sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    // Total count
    const totalBlogs = await Blog.countDocuments(searchFilter);

    // Fetch blogs
    const blogs = await Blog.find(searchFilter)
      .populate("author", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getLatestBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
  status: "published",
})
      .populate("author", "name")
      .sort({ createdAt: -1 });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
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
// Get Single Blog
// ==========================
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // increment views
      { new: true }
    ).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
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
// Update Blog
// ==========================
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Only the owner can update
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    // Update title
if (req.body.title !== undefined) {
  blog.title = req.body.title;
}

// Update content
if (req.body.content !== undefined) {
  blog.content = req.body.content;
}

// Update category
if (req.body.category !== undefined) {
  blog.category = req.body.category;
}
if (req.body.status !== undefined) {
  blog.status = req.body.status;
}
// Update tags
if (req.body.tags !== undefined) {
  try {
    blog.tags = JSON.parse(req.body.tags);
  } catch {
    blog.tags = [];
  }
}

    // If a new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "BioArchive/Blogs",
      });

      // Save new details
      blog.image = result.secure_url;
      blog.imagePublicId = result.public_id;

      // Delete temporary local file
      await fs.remove(req.file.path);
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);

    // Clean up temporary file if something fails
    if (req.file) {
      await fs.remove(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ==========================
// Delete Blog
// ==========================
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Only the owner can delete the blog
    if (blog.author.toString() !== req.user._id.toString()){
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    // Delete image from Cloudinary if it exists
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    // Delete the blog from MongoDB
    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
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
// Get My Blogs
// ==========================
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user._id,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
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
// Get Blogs By User ID
// ==========================
const getBlogsByUser = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.params.userId,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
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
// Like / Unlike Blog
// ==========================
const toggleLikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = blog.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );

      await blog.save();

      return res.status(200).json({
        success: true,
        message: "Blog unliked successfully",
        totalLikes: blog.likes.length,
        data: blog,
      });
    }

    blog.likes.push(userId);

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog liked successfully",
      totalLikes: blog.likes.length,
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Get Category Statistics
// ==========================
const getCategoryStats = async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: categories,
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
// Get Top Authors
// ==========================

const getTopAuthors = async (req, res) => {
  try {
    const authors = await Blog.aggregate([
      {
        $group: {
          _id: "$author",
          articles: { $sum: 1 },
          totalViews: { $sum: "$views" },
          totalLikes: {
            $sum: {
              $size: {
                $ifNull: ["$likes", []],
              },
            },
          },
        },
      },
      {
        $sort: {
          totalLikes: -1,
          totalViews: -1,
        },
      },
      {
        $limit: 4,
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          userId: "$user._id",
          name: "$user.name",
          avatar: "$user.avatar",
          articles: 1,
          totalViews: 1,
          totalLikes: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: authors,
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
   
};