const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../../../../config/logger");
const helpers = require("../../../helpers/helpers");
const Admin = require("../../../models/Admin");
/**
 * Login a user
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await helpers.getDatabaseName(req);
    const AdminModel = Admin(connection);
    const user = await AdminModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return helpers.response(res, 401, false, "Invalid credentials!", {});
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    AdminModel.update({ token: token }, { where: { id: user.id } });
    return helpers.response(res, 200, true, "Logged In Successfully!", {
      name: user.name,
      email: user.email,
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
module.exports = {
  login,
};
