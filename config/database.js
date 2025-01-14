const { Sequelize } = require("sequelize");
const appConfig = require("../config/app");
const bcrypt = require("bcrypt");
const defineSuperAdmin = require("../app/models/SuperAdmin");

// Main database connection
const sequelizeMain = new Sequelize(
  appConfig.database.database,
  appConfig.database.username,
  appConfig.database.password,
  {
    host: appConfig.database.host,
    dialect: appConfig.database.dialect,
    logging: false,
  }
);
// Function to create a new tenant database connection
const createTenantConnection = (databaseName) => {
  return new Sequelize(
    databaseName,
    appConfig.database.username,
    appConfig.database.password,
    {
      host: appConfig.database.host,
      dialect: appConfig.database.dialect,
      logging: false,
    }
  );
};
const SuperAdmin = defineSuperAdmin(sequelizeMain);
const syncMainDatabase = async () => {
  try {
    await sequelizeMain.sync();
    const adminExists = await SuperAdmin.findOne({
      where: { email: "superadmin@gmail.com" },
    });
    if (!adminExists) {
      const password = appConfig.super_password;
      
      await SuperAdmin.create({
        name: "Super Admin",
        email: "superadmin@gmail.com",
        password: password,
      });
    }
  } catch (error) {
    console.error("Error syncing main database:", error);
  }
};
module.exports = { sequelizeMain, createTenantConnection, syncMainDatabase };
