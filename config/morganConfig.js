const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
// Define the log stream to write logs to access.log
const logStream = fs.createWriteStream(path.join(__dirname, "../logs/access.log"), {
  flags: "a", 
});
const setupMorgan = () => morgan("combined", { stream: logStream });
module.exports = setupMorgan;
/**
 * Logs every HTTP request, providing insights into app behavior.
 * Tracks response times for each request, helping identify bottlenecks.
 * Helps debug issues by capturing request details during errors.
 */
