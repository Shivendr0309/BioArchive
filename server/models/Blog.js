const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    imagePublicId: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
},
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
views: {
  type: Number,
  default: 0,
},
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

blogSchema.index({
  title: "text",
  content: "text",
});

module.exports = mongoose.model("Blog", blogSchema);