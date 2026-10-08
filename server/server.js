const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const hpp = require("hpp");
const path = require("path");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const statsRoutes = require("./routes/statsRoutes");
const protect = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

const app = express();

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required");
if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((origin) => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use(generalLimiter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.status(200).json({ success: true, message: "BioArchive API is running" }));

app.get("/api/health", (req, res) => {
  const healthy = mongoose.connection.readyState === 1;
  res.status(healthy ? 200 : 503).json({
    success: healthy,
    status: healthy ? "healthy" : "degraded",
    database: healthy ? "connected" : "disconnected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/stats", statsRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({ success: true, message: "Protected route accessed", user: req.user });
});

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;
let server;

const start = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => console.log(`BioArchive API running on port ${PORT}`));
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  console.log(`${signal}: shutting down gracefully...`);
  if (server) await new Promise((resolve) => server.close(resolve));
  await mongoose.connection.close(false).catch(() => {});
  process.exit(0);
};

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

start();

module.exports = app;