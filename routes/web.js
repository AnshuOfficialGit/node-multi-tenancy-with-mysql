/**
 * This is the the web routes file for the application
 */
const express = require("express");
const router = express.Router();
const path = require("path");


/**
 * Welcome Page
 */
router.get("/", (req, res) => {
  res.render("welcome", {
    appName: process.env.APP_NAME,
    appVersion: process.env.APP_VERSION,
    appUrl: process.env.APP_URL,
  });
})
module.exports = router;
