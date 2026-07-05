const express = require("express");
const { getStats } = require("../controllers/statsController");

const router = express.Router();

// Public route
router.get("/", getStats);

module.exports = router;