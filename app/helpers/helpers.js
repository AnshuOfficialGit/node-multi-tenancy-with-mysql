const helpers = {};
const moment = require("moment");
const Tenant = require("../models/Tenant");
const { createTenantConnection } = require("../../config/database");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const RolePermission = require("../models/RolePermission");
const modelCache = new Map();
/**
 * Response helper
 */
helpers.response = (
  res,
  code = "200",
  status = false,
  message = null,
  data = {}
) => {
  res.status(code).send({ status: status, message: message, data: data });
};
/**
 * Format the date and time
 */
helpers.formatDateTime = (data) => {
  return moment(data).format("DD-MM-YYYY HH:mm A");
};
/**
 * Base URL helper
 */
helpers.baseURL = (req) => {
  const protocol = req.protocol;
  const host = req.get("host");
  const baseUrl = `${protocol}://${host}`;
  return baseUrl;
};
/**
 * Make the first Character in Upper Case.
 */
helpers.capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Get the Database Name
 */
helpers.getDatabase = async (req) => {
  const tenantDomain = req.params.domain;
  const db = await Tenant.findOne({ where: { domain: tenantDomain } });
  const tenantDatabaseName = db.database_name;
  const tenantConnection = createTenantConnection(tenantDatabaseName);
  const models = require("../models/association")(tenantConnection);
  await tenantConnection.sync();
  modelCache.set(tenantDomain, models);
  return models;
};
helpers.getDatabaseName = async (req) => {
  const tenantDomain = req.params.domain;
  const db = await Tenant.findOne({ where: { domain: tenantDomain } });
  const tenantDatabaseName = db.database_name;
  const tenantConnection = createTenantConnection(tenantDatabaseName);
  return tenantConnection;
};
helpers.getCode = (name, id) => {
  const words = name.trim().split(/\s+/);
  const code = words.map((word) => word[0].toUpperCase()).join("");
  const name_code = code + "-" + id;
  return name_code;
};
module.exports = helpers;
