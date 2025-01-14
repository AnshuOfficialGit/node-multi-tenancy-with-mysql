/**
 * This is the api routes file for the Super Admin
 */
const express = require("express");
const router = express.Router();
require("express-group-routes");
const tenantController = require("../app/controllers/super/tenant/tenantController");
const authController = require("../app/controllers/super/auth/authController");
const { superAuthenticate } = require("../app/middleware/authenticate");
const {
  validate,
  validateLogin,
  validateCreateTenant,
  validateUpdateTenant,
} = require("../app/requests/superValidation");

/**
 * Authentication Routes
 */
router.group("/auth", (router) => {
  router.post("/login", validateLogin, validate, authController.login);
});

/**
 * Tenants Routes
 */
router.group("/tenant", (router) => {
  router.get("/", superAuthenticate, tenantController.list);
  router.post(
    "/create",
    superAuthenticate,
    validateCreateTenant,
    validate,
    tenantController.create
  );
  router.get("/details/:tenant_id", superAuthenticate, tenantController.show);
  router.post(
    "/update",
    superAuthenticate,
    validateUpdateTenant,
    validate,
    tenantController.updateTenant
  );
});

/**
 * Page Not Found
 */
router.get("*", (req, res) => {
  return helpers.response(res, 404, false, "Page Not Found !", {});
});

module.exports = router;
