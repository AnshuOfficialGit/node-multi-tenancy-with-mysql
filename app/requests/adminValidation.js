const { check, body, validationResult } = require("express-validator");
const helpers = require("../helpers/helpers");

/**
 * Login Validation
 */
module.exports.validateLogin = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Invalid email format!"),
  body("password").not().isEmpty().withMessage("Password is required!"),
];

/**
 * Create Role Validation
 */
module.exports.validateCreateRole = [
  body("name").not().isEmpty().withMessage("Role Name is required!"),
];
/**
 * Update Role Validation
 */
module.exports.validateUpdateRole = [
  body("name").not().isEmpty().withMessage("Role Name is required!"),
  body("role_id")
    .not()
    .isEmpty()
    .withMessage("Role Id is required!")
    .isNumeric()
    .withMessage("Role Id must be a number!"),
];

/**
 * Create Permission Validation
 */
module.exports.validateCreatePermission = [
  body("name").not().isEmpty().withMessage("Permission Name is required!"),
];
/**
 * Update Permission Validation
 */
module.exports.validateUpdatePermission = [
  body("name").not().isEmpty().withMessage("Permission Name is required!"),
  body("permission_id")
    .not()
    .isEmpty()
    .withMessage("Permission Id is required!")
    .isNumeric()
    .withMessage("Permission Id must be a number!"),
];

module.exports.validateCreateAssignPermission = [
  body("role_id")
    .not()
    .isEmpty()
    .withMessage("Role Id is required!")
    .isNumeric()
    .withMessage("Role Id must be a number!"),
  body("permission_ids")
    .isArray({ min: 1 })
    .withMessage("Permission IDs must be a non-empty array"),
];
module.exports.validateUpdateAssignPermission = [
  body("role_id")
    .not()
    .isEmpty()
    .withMessage("Role Id is required!")
    .isNumeric()
    .withMessage("Role Id must be a number!"),
  body("permission_ids")
    .isArray({ min: 1 })
    .withMessage("Permission IDs must be a non-empty array"),
];



/**
 * Validate the request body
 * display the error message
 */
module.exports.validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errorMessage = error.array()[0].msg;
    return helpers.response(res, 400, false, errorMessage, {});
  }
  return next();
};
