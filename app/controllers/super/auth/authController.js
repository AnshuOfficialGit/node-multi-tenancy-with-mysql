const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../../../../config/logger");
const helpers = require("../../../helpers/helpers");
const SuperAdmin = require("../../../models/SuperAdmin");
const { sequelizeMain } = require("../../../../config/database");
const defineSuperAdmin = require("../../../models/SuperAdmin");
/**
 * Login a user
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const SuperAdmin = defineSuperAdmin(sequelizeMain);
    const user = await SuperAdmin.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return helpers.response(res, 401, false, "Invalid credentials!", {});
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    SuperAdmin.update({ token: token }, { where: { email: user.email } });
    return helpers.response(res, 200, true, "Logged In Successfully!", {
      name: user.name,
      token: token,
    });
  } catch (err) {
    logger.error("Log error " + err.message);
    return helpers.response(
      res,
      500,
      true,
      "Something went wrong!",
      err.message
    );
  }
};
