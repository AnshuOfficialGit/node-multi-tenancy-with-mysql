const { registerTenant } = require("../../../services/TenantService");
const logger = require("../../../../config/logger");
const helpers = require("../../../helpers/helpers");
const Tenant = require("../../../models/Tenant");
const Resource = require("../../../resource/Resource");
const { Op } = require("sequelize");
/**
 * List all tenants
 */
const list = async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    const tenantResource = Resource.tenantResource(req, tenants);
    return helpers.response(res, 200, true, "Tenant List", tenantResource);
  } catch (error) {
    logger.error(error);
    return helpers.response(res, 500, false, "Error", {});
  }
};
/**
 * Create a new tenant
 */
const create = async (req, res) => {
  try {
    const checkName = await Tenant.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (checkName) {
      return helpers.response(
        res,
        200,
        false,
        "Tenant Name already exists!",
        {}
      );
    }
    const checkEmail = await Tenant.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (checkEmail) {
      return helpers.response(
        res,
        200,
        false,
        "Tenant Email already exists!",
        {}
      );
    }
    const checkMobile = await Tenant.findOne({
      where: {
        mobile: req.body.mobile,
      },
    });
    if (checkMobile) {
      return helpers.response(
        res,
        200,
        false,
        "Tenant Mobile already exists!",
        {}
      );
    }
    const tenant = await registerTenant(req);
    if (tenant) {
      return helpers.response(
        res,
        200,
        true,
        "A Tenant Client Created Successfully!",
        {}
      );
    } else {
      return helpers.response(
        res,
        200,
        true,
        "Unable to create a Tenant Client!",
        {}
      );
    }
  } catch (error) {
    logger.error("Log error " + error.message);
    return helpers.response(
      res,
      500,
      true,
      "Something went wrong!",
      error.message
    );
  }
};
/**
 * List a Signle tenants
 */
const show = async (req, res) => {
  try {
    if (!req.params.tenant_id) {
      return helpers.response(res, 404, false, "Tenant Id is required", {});
    }
    const tenants = await Tenant.findOne({
      where: {
        id: req.params.tenant_id,
      },
    });
    const tenantResource = Resource.tenantResource(req, tenants);
    return helpers.response(res, 200, true, "Tenant List", tenantResource);
  } catch (error) {
    logger.error(error);
    return helpers.response(res, 500, false, "Error", {});
  }
};
/**
 * Update a tenants
 */
const updateTenant = async (req, res) => {
 
    try {
      const { name, mobile, employee_limit, tenant_id } = req.body;
      const checkName = await Tenant.findOne({
        where: {
          name: req.body.name,
          id: { [Op.not]: req.body.tenant_id },
        },
      });
      if (checkName) {
        return helpers.response(
          res,
          200,
          false,
          "Tenant Name already exists!",
          {}
        );
      }
      const checkMobile = await Tenant.findOne({
        where: {
          mobile: req.body.mobile,
          id: { [Op.not]: req.body.tenant_id },
        },
      });
      if (checkMobile) {
        return helpers.response(
          res,
          200,
          false,
          "Tenant Mobile already exists!",
          {}
        );
      }
      const tenant = await Tenant.findByPk(tenant_id);
      if (!tenant) {
        return helpers.response(res, 404, false, "tenant not found", {});
      }
      await tenant.update({ name, mobile, employee_limit });
      if (tenant) {
        return helpers.response(
          res,
          200,
          true,
          "A Tenant Client Updated Successfully!",
          {}
        );
      } else {
        return helpers.response(
          res,
          200,
          true,
          "Unable to update a Tenant Client!",
          {}
        );
      }
    } catch (error) {
      logger.error("Log error " + error.message);
      return helpers.response(
        res,
        500,
        true,
        "Something went wrong!",
        error.message
      );
    }
};
module.exports = { create, list, show, updateTenant };
