module.exports = (tenantConnection) => {
  const Role = require("./Role")(tenantConnection);
  const Permission = require("./Permission")(tenantConnection);
  const RolePermission = require("./RolePermission")(tenantConnection);
  const Department = require("./Department")(tenantConnection);
  const Employee = require("./Employee")(tenantConnection);
  const EmployeeDetail = require("./EmployeeDetail")(tenantConnection);
  const EmployeeDocument = require("./EmployeeDocument")(tenantConnection);

  /**
   * Role and Permission Association
   */
  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "role_id",
    otherKey: "permission_id",
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permission_id",
    otherKey: "role_id",
  });
  RolePermission.belongsTo(Role, {
    foreignKey: "role_id",
    as: "Role",
  });
  RolePermission.belongsTo(Permission, {
    foreignKey: "permission_id",
    as: "Permission",
  });
  /**
   * Role and Permission Association End
   */


  return {
    Role,
    Permission,
    RolePermission,
    Department,
    Employee,
    EmployeeDetail,
    EmployeeDocument,
  };
};
