const helpers = require("../helpers/helpers");
/**
 * Tenant Data
 */
module.exports.tenantData = (req, tenant) => ({
  id: tenant.id,
  name: tenant.name,
  email: tenant.email,
  mobile: tenant.mobile,
  employee_limit: tenant.employee_limit,
  status: helpers.capitalizeFirstLetter(tenant.status),
  database_name: tenant.database_name,
  domain: tenant.domain,
  url: tenant.url,
  created_at: helpers.formatDateTime(tenant.created_at),
});
/**
 * Role Data
 */
module.exports.roleDetails = (req, role) => ({
  id: role.id || "",
  name: role.name || "",
  display_name: role.display_name || "",
  discription: role.description || "",
  created_at: helpers.formatDateTime(role.created_at),
});
/**
 * Permission Data
 */
module.exports.permissionDetails = (req, permission) => ({
  id: permission.id || "",
  name: permission.name || "",
  display_name: permission.display_name || "",
  discription: permission.description || "",
  created_at: helpers.formatDateTime(permission.created_at),
});

/**
 * Permission Data
 */
module.exports.roleWisePermissionDetails = (req, permission) => ({
  id: permission.id || "",
  name: permission.name || "",
  display_name: permission.display_name,
  description: permission.description,
  created_at: helpers.formatDateTime(permission.created_at),
});

module.exports.roleWisePermissionDetails = (req, role) => ({
  id: role.id || "",
  name: role.name || "",
  description: role.description || "",

  permissions: role.Permissions
    ? role.Permissions.map((permission) => permissionDetails(req, permission))
    : [],
});
const permissionDetails = (req, permission) => ({
  id: permission.id || "",
  name: permission.name || "",
  display_name: permission.display_name || "",
  description: permission.description || "",
  // created_at: helpers.formatDateTime(permission.created_at),
});

module.exports.departmentListDetails = (req, department) => ({
  id: department.id || "",
  name: department.name || "",
  code: department.unique_id || "",
  created_at: helpers.formatDateTime(department.created_at),
});
