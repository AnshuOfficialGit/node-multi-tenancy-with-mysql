const Tenant = require("../models/Tenant");
const bcrypt = require("bcrypt");
const { createTenantConnection } = require("../../config/database");
const appConfig = require("../../config/app");
const Admin = require("../models/Admin");
// const User = require("../models/User");
// const UserDetails = require("../models/UserDetails");
const mysql = require("mysql2/promise");
const helpers = require("../helpers/helpers");
const modelCache = new Map();

const registerTenant = async (req) => {
  const { name, email, password, mobile, employee_limit } = req.body;
  const baseUrl = helpers.baseURL(req);
  const prefix = appConfig.database.prefix;
  const DBName = name.toLowerCase().replace(/ /g, "_");
  const domain = name.toLowerCase().replace(/ /g, "-");
  const database_name = `${prefix}${DBName}`;
  const url = `${baseUrl}/api/admin/${domain.toLowerCase()}`;

  const databaseConfiguration = {
    host: appConfig.database.host,
    user: appConfig.database.username,
    password: appConfig.database.password,
  };
  try {
    const connection = await mysql.createConnection(databaseConfiguration);
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${database_name}\``
    );

    await connection.end();
  } catch (error) {
    console.error("Error creating database:", error);
    throw new Error("Database creation failed.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const tenant = await Tenant.create({
    name,
    email,
    password: hashedPassword,
    mobile,
    employee_limit,
    database_name,
    domain,
    url,
  });
  const tenantConnection = createTenantConnection(database_name);
  // const models = require("../models/association")(tenantConnection);
  
  const AdminModel = Admin(tenantConnection);
  
  await tenantConnection.sync();
  const admin = await AdminModel.create({
    name,
    email,
    password: hashedPassword,
    mobile,
    employee_limit,
    database_name,
    domain,
    url,
  });
  //   const UserModel = User(tenantConnection);
  //   const UserDetailsModel = UserDetails(tenantConnection);

  return tenant;
};
module.exports = { registerTenant };
