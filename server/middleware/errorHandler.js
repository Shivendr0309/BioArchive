const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json(
    new ApiResponse(
      false,
      err.message || "Internal Server Error"
    )
  );
};

module.exports = errorHandler;