/**
 * This is the main routes file for the application
 */
const express = require("express");
const router = express.Router();
const api = require("./api");
const web = require("./web");
const helpers = require('../app/helpers/helpers')
/**
 * Routes for API
 */
router.use("/api", api);
/**
 * Routes for API
 */
router.use("/", web);



module.exports = router;
