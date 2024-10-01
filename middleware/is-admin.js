const { USER_ROLES } = require("../util/enum");

/**
 * Validate if user has admin role.
 */
module.exports = (req, res, next) => {
  const role = req.role;

  if (role !== USER_ROLES.R1) {
    return res.status(401).json({ status: 401, message: "Role is invalid." });
  }

  next();
};
