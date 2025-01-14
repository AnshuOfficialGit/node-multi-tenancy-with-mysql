const helpers = require("../../../helpers/helpers");
const logger = require("../../../../config/logger");
const Resource = require("../../../resource/Resource");
const Role = require("../../../models/Role");
const Permission = require("../../../models/Permission");
const RolePermission = require("../../../models/RolePermission");
const { Op } = require("sequelize");

/**
 * Role Wise Permission List
 */
const list = async (req, res) => {
  try {
    const models = await helpers.getDatabase(req);
    const roles = await models.Role.findAll({
      include: [
        {
          model: models.Permission,
          through: { attributes: [] },
        },
      ],
    });
    if (!roles.length) {
      return helpers.response(res, 404, false, "No roles found", {});
    }
    const result = Resource.roleWisePermission(req, roles);
    return helpers.response(
      res,
      200,
      true,
      "Role-wise permissions listed successfully",
      result
    );
  } catch (err) {
    logger.error("Log error " + err.message);
    return helpers.response(
      res,
      500,
      false,
      "Something went wrong! " + err.message,
      {}
    );
  }
};

/**
 * Role wise Permission Store
 */
const store = async (req, res) => {
  const { role_id, permission_ids } = req.body;
  try {
    const models = await helpers.getDatabase(req);
    const PermissionModel = models.Permission;
    const RoleModel = models.Role;
    const RolePermissionModel = models.RolePermission;
    const role = await RoleModel.findByPk(role_id);
    if (!role) {
      return helpers.response(res, 404, false, "Role not found", {});
    }
    const check = RolePermissionModel.findOne({
      where: {
        id: role_id,
      },
    });
    if (check) {
      return helpers.response(
        res,
        404,
        false,
        "Role & Permission already assigned",
        {}
      );
    }
    const permissions = await PermissionModel.findAll({
      where: {
        id: permission_ids,
      },
    });
    if (permissions.length !== permission_ids.length) {
      return helpers.response(
        res,
        404,
        false,
        "One or more permissions not found",
        {}
      );
    }
    const rolePermissions = permission_ids.map((permission_id) => ({
      role_id,
      permission_id,
    }));
    await RolePermissionModel.bulkCreate(rolePermissions);
    return helpers.response(
      res,
      200,
      true,
      "Permissions assigned to role successfully!",
      {}
    );
  } catch (err) {
    logger.error("Log error " + err.message);
    return helpers.response(
      res,
      500,
      false,
      "Something went wrong! " + err.message,
      {}
    );
  }
};
/**
 * Role wise Permission Update
 */
const update = async (req, res) => {
  const { role_id, permission_ids } = req.body;
  try {
    const models = await helpers.getDatabase(req);
    const PermissionModel = models.Permission;
    const RoleModel = models.Role;
    const RolePermissionModel = models.RolePermission;
    const role = await RoleModel.findByPk(role_id);
    if (!role) {
      return helpers.response(res, 404, false, "Role not found", {});
    }
    const permissions = await PermissionModel.findAll({
      where: {
        id: permission_ids,
      },
    });
    if (permissions.length !== permission_ids.length) {
      return helpers.response(
        res,
        404,
        false,
        "One or more permissions not found",
        {}
      );
    }
    await RolePermissionModel.destroy({
      where: { role_id },
    });
    const rolePermissions = permission_ids.map((permission_id) => ({
      role_id,
      permission_id,
    }));
    await RolePermissionModel.bulkCreate(rolePermissions);
    return helpers.response(
      res,
      200,
      true,
      "Role permissions updated successfully!",
      {}
    );
  } catch (err) {
    logger.error("Log error " + err.message);
    return helpers.response(
      res,
      500,
      false,
      "Something went wrong! " + err.message,
      {}
    );
  }
};
module.exports = {
  list,
  store,
  update,
};
