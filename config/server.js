const express = require("express");
const path = require("path");
const routes = require("../routes/route");
const config = require("../config/app");
const cors = require("cors");
const helmet = require("helmet");
const { sequelizeMain, syncMainDatabase } = require("../config/database");
const server = express();
const setupMorgan = require("../config/morganConfig");
const bodyParser = require("body-parser");

/**
 * Use Morgan middleware
 */
server.use(setupMorgan());
/**
 * Secure HTTP headers.
 */
server.use(helmet());
/**
 * Cors Policy
 */
var corsPolicy = {
  origin: "*",
  methods: ["GET", "POST"],
};
server.use(cors(corsPolicy));
/**
 * Parse incoming request.
 */
server.use(bodyParser.json());
/**
 * Load static files
 */
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "../resources/views"));
/**
 * Load Routes Files
 */
server.use(routes);
/**
 * Initialize the database and start the server
 */
sequelizeMain
  .authenticate()
  .then(() => {
    server.listen(config.port, () => {
      console.log(` INFO  Server is running...`);
      console.log(`
      PORT       : ${config.colors.fgGreen}${config.port}${config.colors.reset}
      API URL    : ${config.colors.fgGreen}${config.appUrl}:${config.port}/api${config.colors.reset}
      Web URL    : ${config.colors.fgGreen}${config.appUrl}:${config.port}${config.colors.reset}
      `);
      console.log(
        `${config.colors.fgYellow}Press Ctrl+C to stop the server${config.colors.reset}`
      );
    });
    return syncMainDatabase();
  })
  .catch((error) => {
    console.error(
      `${config.colors.fgRed}Error connecting to the database:${config.colors.reset}`,
      error
    );
    process.exit(1);
  });
module.exports = { server };
