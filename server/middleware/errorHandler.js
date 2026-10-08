const multer = require("multer");
const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`, err);
  if (err instanceof multer.MulterError) {
    const message = err.code === "LIMIT_FILE_SIZE" ? "Image must be 5MB or smaller" : err.message;
    return res.status(400).json(new ApiResponse(false, message));
  }
  if (err.name === "ValidationError") return res.status(400).json(new ApiResponse(false, "Validation failed", null, { fields: Object.values(err.errors).map((e) => e.path) }));
  if (err.name === "CastError") return res.status(400).json(new ApiResponse(false, "Invalid resource id"));
  if (err.code === 11000) return res.status(409).json(new ApiResponse(false, "A record with this value already exists"));
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json(new ApiResponse(false, statusCode === 500 ? "Internal Server Error" : err.message));
};

module.exports = errorHandler;