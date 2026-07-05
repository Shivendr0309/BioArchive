const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
// savedArticles: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Blog",
//   },
// ],
    avatar: {
      type: String,
      default:
        "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=User",
    },
    bookmarks: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
],
readingHistory: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

/* ----------------------------------
   Hash Password Before Save
----------------------------------- */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(
      this.password,
      salt
    );

    next();
  } catch (error) {
    next(error);
  }
});

/* ----------------------------------
   Compare Password
----------------------------------- */

userSchema.methods.comparePassword =
  async function (enteredPassword) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

module.exports = mongoose.model(
  "User",
  userSchema
);