const mongoose = require("mongoose");

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);
const normalizeString = (value) => typeof value === "string" ? value.trim() : "";
const validatePagination = (pageValue, limitValue) => {
  const parsedPage = Number.parseInt(pageValue, 10);
  const parsedLimit = Number.parseInt(limitValue, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 50) : 10;
  return { page, limit };
};

module.exports = { isValidObjectId, normalizeString, validatePagination };