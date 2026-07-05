const Blog = require("../models/Blog");
const User = require("../models/User");

const getStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();

    const totalUsers = await User.countDocuments();

    const blogs = await Blog.find({}, "likes views");

    let totalLikes = 0;
    let totalViews = 0;

    blogs.forEach((blog) => {
      totalLikes += blog.likes?.length || 0;
      totalViews += blog.views || 0;
    });

    res.status(200).json({
      success: true,
      data: {
        totalBlogs,
        totalUsers,
        totalLikes,
        totalViews,
      },
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
  getStats,
};