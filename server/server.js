const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const statsRoutes = require("./routes/statsRoutes");
const protect = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables

const cloudinary = require("./config/cloudinary");

// Connect to MongoDB
connectDB();

const app = express();
app.use(helmet());

/* ----------------------------------
   Middlewares
----------------------------------- */


app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);
app.use(
  express.urlencoded({
    extended: true,
  })
);

/* ----------------------------------
   Static Files
----------------------------------- */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* ----------------------------------
   Health Check
----------------------------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: " BioArchive API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

/* ----------------------------------
   API Routes
----------------------------------- */

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/comments", commentRoutes);
app.use("/api/stats", statsRoutes);
/* ----------------------------------
   Protected Route Example
----------------------------------- */

app.get(
  "/api/protected",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "You have accessed a protected route!",
      user: req.user,
    });
  }
);

/* ----------------------------------
   404 Handler
----------------------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ----------------------------------
   Global Error Handler
----------------------------------- */

app.use(errorHandler);

/* ----------------------------------
   Start Server
----------------------------------- */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    ` BioArchive API running on port ${PORT}`
  );
});
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  process.exit(0);
});