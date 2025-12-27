const express = require("express");
const router = express.Router();

// contoh endpoint
router.get("/", (req, res) => {
  res.send("Session route works");
});

module.exports = router;