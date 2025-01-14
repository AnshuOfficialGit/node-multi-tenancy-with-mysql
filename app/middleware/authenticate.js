const jwt = require("jsonwebtoken");
const helpers = require("../helpers/helpers");
const { sequelizeMain } = require("../../config/database");
const defineSuperAdmin = require("../models/SuperAdmin");
const Admin = require("../models/Admin");
require("dotenv").config();
const superAuthenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return helpers.response(
      res,
      401,
      false,
      "Access denied : No token provided",
      {}
    );
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, api_key) => {
        if (err) {
          return helpers.response(res, 401, false, "Invalid Token!", {});
        } else {
          const SuperAdmin = defineSuperAdmin(sequelizeMain);
          const userid = await SuperAdmin.findOne({ where: { token: token } });
          if (userid) {
            req.user = verified;
            next();
          } else {
            return helpers.response(res, 401, false, "Invalid Token!", {});
          }
        }
      }
    );
  } catch (err) {
    return helpers.response(res, 401, false, "Invalid token", {});
  }
};

const adminAuthenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return helpers.response(
      res,
      401,
      false,
      "Access denied : No token provided",
      {}
    );
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, api_key) => {
        if (err) {
          return helpers.response(res, 401, false, "Invalid Token!", {});
        } else {
          const models = await helpers.getDatabase(req);
         

          // const userid = await models.AdminModel.findOne({ where: { token: token } });
          // if (userid) {
            req.user = verified;
            next();
          // } else {
          //   return helpers.response(res, 401, false, "Invalid Token!", {});
          // }
        }
      }
    );
  } catch (err) {
    return helpers.response(res, 401, false, "Invalid token", {});
  }
};
module.exports = {
  superAuthenticate,
  adminAuthenticate,
};
