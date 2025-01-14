/**
 * This is the main routes file for the application
 */
const express = require("express");
const router = express.Router();
const superRoute = require("./super");
const adminRoute = require("./admin");
const employeeRoute = require("./employee");
/**
 * Routes for Super Admin
 */
router.use("/super", superRoute);
/**
 * Routes for Admin
 */
router.use("/admin", adminRoute);
/**
 * Routes for Employee
 */
router.use("/employee", employeeRoute);

module.exports = router;
