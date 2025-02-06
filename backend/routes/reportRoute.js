const express = require("express");
const { getReport } = require("../controller/reportController");

const router = express.Router();
router.get("/reports", getReport);

module.exports = router;