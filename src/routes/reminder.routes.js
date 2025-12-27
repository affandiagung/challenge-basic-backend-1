const express = require("express");
const router = express.Router();

// contoh endpoint
router.get("/", (req, res) => {
  res.send("Reminder route works");
});

module.exports = router;
