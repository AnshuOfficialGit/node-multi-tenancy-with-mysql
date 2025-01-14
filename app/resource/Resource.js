const {
  tenantData,
  roleDetails,
  permissionDetails,
  roleWisePermissionDetails,
  departmentListDetails
} = require("./Data");

/**
 * Tenant Resource
 */
module.exports.tenantResource = (req, tenant) => {
  if (req.params.tenant_id) {
    return tenantData(req, tenant);
  } else {
    return tenant.map((ten) => tenantData(req, ten));
  }
};

/**
 * Role Resource
 */
module.exports.rolesList = (req, roles) => {
  if (req.params.id) {
    return roleDetails(req, roles);
  } else {
    return roles.map((role) => roleDetails(req, role));
  }
};
/**
 * Permission Resource
 */
module.exports.permissionList = (req, permissions) => {
  if (req.params.id) {
    return permissionDetails(req, permissions);
  } else {
    return permissions.map((permission) => permissionDetails(req, permission));
  }
};

/**
 * Role Wise Permission Resource
 */

module.exports.roleWisePermission = (req, roles) => {
  if (req.params.id) {
    return roleWisePermissionDetails(req, roles);
  } else {
    return roles.map((role) => roleWisePermissionDetails(req, role));
  }
};

/**
 * Role Wise Permission Resource
 */

module.exports.departmentList = (req, roles) => {
  if (req.params.id) {
    return departmentListDetails(req, roles);
  } else {
    return roles.map((role) => departmentListDetails(req, role));
  }
};
