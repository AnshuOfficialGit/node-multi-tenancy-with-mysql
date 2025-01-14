const helpers = require("../../../../helpers/helpers");
const logger = require("../../../../../config/logger");
const Resource = require("../../../../resource/Resource");
const Department = require("../../../../models/Department");
const { Op } = require("sequelize");
/**
 * List of all Roles
 */
const list = async (req, res) => {
  try {
    const models = await helpers.getDatabase(req);
    const DepartmentModel = models.Department;
    const departments = await DepartmentModel.findAll({
      order: [["id", "DESC"]],
    });
    const response = Resource.departmentList(req, departments);
    return helpers.response(res, 200, true, "Department Lists!", response);
  } catch (err) {
    logger.error("Log error " + err.message);
    return helpers.response(res, 500, true, "Something went wrong!", {});
  }
};
/**
 * Create a new Role
 */
const store = async (req, res) => {
  const { name } = req.body;
  try {
    const models = await helpers.getDatabase(req);
    const DepartmentModel = models.Department;
    const check = await DepartmentModel.findOne({ where: { name } });
    if (check) {
      return helpers.response(
        res,
        401,
        false,
        "Department name  already exists!",
        {}
      );
    }
    const depatment = await DepartmentModel.create({ name });
    const unique_id = helpers.getCode(name, depatment.id);
    await DepartmentModel.update(
      { unique_id },
      { where: { id: depatment.id } }
    );
    return helpers.response(
      res,
      200,
      true,
      "Department created successfully!",
      {}
    );
  } catch (err) {
    logger.error("Log error " + err.message);
    return helpers.response(
      res,
      500,
      true,
      "Something went wrong!" + err.message,
      {}
    );
  }
};
/**
 * Single Role Details
 */
const show = async (req, res) => {
  try {
    const models = await helpers.getDatabase(req);
    const DepartmentModel = models.Department;
    if (!req.params.id) {
      return helpers.response(res, 404, false, "Department Id is required", {});
    }
    const departments = await DepartmentModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    const response = Resource.departmentList(req, departments);
    return helpers.response(res, 200, true, "Department Details!", response);
  } catch (err) {
    logger.error("Log error " + err.message);
    return helpers.response(res, 500, true, "Something went wrong!", {});
  }
};
/**
 * Update Role Details
 */
const update = async (req, res) => {
  const { department_id, name } = req.body;
  try {
    const models = await helpers.getDatabase(req);
    const DepartmentModel = models.Department;
    const department = await DepartmentModel.findByPk(department_id);
    if (!department) {
      return helpers.response(res, 404, false, "Department not found", {});
    }
    const checkName = await DepartmentModel.findOne({
      where: {
        name: name,
        id: { [Op.not]: department_id },
      },
    });
    if (checkName) {
      return helpers.response(
        res,
        200,
        false,
        "Department Name already exists!",
        {}
      );
    }
    const unique_id = helpers.getCode(name, department_id);
    await department.update({ name, unique_id });
    return helpers.response(
      res,
      200,
      true,
      "Department updated successfully!",
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
 * Destroy the Roles
 */
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const models = await helpers.getDatabase(req);
    const DepartmentModel = models.Department;
    const department = await DepartmentModel.findByPk(id);
    if (!department) {
      return helpers.response(res, 404, false, "Department not found", {});
    }
    await department.destroy();
    return helpers.response(
      res,
      200,
      true,
      "Department deleted successfully!",
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
  show,
  update,
  destroy,
};
