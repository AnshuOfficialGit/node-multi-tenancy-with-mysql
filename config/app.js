require("dotenv").config();
module.exports = {
  port: process.env.PORT || 3000,
  appName: process.env.APP_NAME || "My Node App",
  appUrl: process.env.APP_URL || "http://localhost",
  version: process.env.APP_VERSION || "1.0.0",
  environment: process.env.NODE_ENV || "development",
  /**
   * Colors for console output
   */
  colors: {
    reset: "\x1b[0m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
  },
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    prefix: process.env.DB_TENTANT_PREFIX,
    logging: false,
  },
  super_password:process.env.SUPER_PASSWORD,
};
