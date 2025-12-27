const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api.controller");

router.get("/api", apiController.check);

module.exports = router;
