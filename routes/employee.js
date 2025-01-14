/**
 * This is the api routes file for Employee
 */
const express = require("express");
const router = express.Router();
require("express-group-routes");
const { authenticate } = require("../app/middleware/authenticate");

/**
 * Page Not Found
 */
router.get("*", (req, res) => {
  return helpers.response(res, 404, false, "Page Not Found !", {});
});
module.exports = router;
