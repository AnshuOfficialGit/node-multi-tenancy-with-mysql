/**
 * This is the api routes file for the Admin
 */
const express = require("express");
const router = express.Router();
require("express-group-routes");
const { adminAuthenticate } = require("../app/middleware/authenticate");
const authController = require("../app/controllers/admin/auth/authController");
const roleController = require("../app/controllers/admin/authorization/roleController");
const permissionController = require("../app/controllers/admin/authorization/permissionController");
const authorizationController = require("../app/controllers/admin/authorization/authorizationController");
const departmentController = require("../app/controllers/admin/master/department/departmentController");
const {
  validate,
  validateLogin,
  validateCreateRole,
  validateUpdateRole,
  validateCreatePermission,
  validateUpdatePermission,
  validateCreateAssignPermission,
  validateUpdateAssignPermission,
} = require("../app/requests/adminValidation");
/**
 * Authentication Routes
 */
router.post("/:domain/login", validateLogin, authController.login);

/**
 * Roles Management Routes
 */

router.get("/:domain/roles", adminAuthenticate, roleController.list);
router.post(
  "/:domain/roles/create",
  adminAuthenticate,
  validateCreateRole,
  validate,
  roleController.store
);
router.post(
  "/:domain/roles/update",
  adminAuthenticate,
  validateUpdateRole,
  validate,
  roleController.update
);
router.get("/:domain/roles/:id", adminAuthenticate, roleController.show);
router.get(
  ":domain/roles/delete/:id",
  adminAuthenticate,
  roleController.destroy
);

/**
 * Permission Management Routes
 */

router.get("/:domain/permission", adminAuthenticate, permissionController.list);
router.post(
  "/:domain/permission/create",
  adminAuthenticate,
  validateCreatePermission,
  validate,
  permissionController.store
);
router.post(
  "/:domain/permission/update",
  adminAuthenticate,
  validateUpdatePermission,
  validate,
  permissionController.update
);
router.get(
  "/:domain/permission/:id",
  adminAuthenticate,
  permissionController.show
);
router.get(
  "/:domain/permission/delete/:id",
  adminAuthenticate,
  permissionController.destroy
);

/**
 * Permission Assignment Routes
 */

router.get(
  "/:domain/authorization",
  adminAuthenticate,
  authorizationController.list
);
router.post(
  "/:domain/authorization/create",
  adminAuthenticate,
  validateCreateAssignPermission,
  validate,
  authorizationController.store
);
router.post(
  "/:domain/authorization/update",
  adminAuthenticate,
  validateUpdateAssignPermission,
  validate,
  authorizationController.update
);



/**
 * Page Not Found
 */
router.get("*", (req, res) => {
  return helpers.response(res, 404, false, "Page Not Found !", {});
});

module.exports = router;
