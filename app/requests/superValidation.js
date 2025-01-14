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
 * Create Tenant Validation
 */
module.exports.validateCreateTenant = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters!"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email format!")
    .isLength({ max: 100 })
    .withMessage("Email must not exceed 100 characters!"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters!"),
  body("mobile")
    .not()
    .isEmpty()
    .withMessage("Phone is required!")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone must be between 10 and 15 characters!"),
  body("employee_limit")
    .not()
    .isEmpty()
    .withMessage("Employee Limit is required!")
    .isNumeric()
    .withMessage("Employee Limit must be a number!")
    .isLength({ max: 5 })
    .withMessage("Employee Limit must not exceed 5 digits!"),
];

/**
 * Details Tenant Validation
 */
module.exports.validateDetailsTenant = [
  body("tenant_id")
    .not()
    .isEmpty()
    .withMessage("Tenant Id is required!")
    .isNumeric()
    .withMessage("Tenant Id must be a number!"),
];

/**
 * Update Tenant Validation
 */
module.exports.validateUpdateTenant = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters!"),
  body("mobile")
    .not()
    .isEmpty()
    .withMessage("Phone is required!")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone must be between 10 and 15 characters!"),
  body("employee_limit")
    .not()
    .isEmpty()
    .withMessage("Employee Limit is required!")
    .isNumeric()
    .withMessage("Employee Limit must be a number!")
    .isLength({ max: 5 })
    .withMessage("Employee Limit must not exceed 5 digits!"),
  body("tenant_id")
    .not()
    .isEmpty()
    .withMessage("Tenant Id is required!")
    .isNumeric()
    .withMessage("Tenant Id must be a number!"),
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
