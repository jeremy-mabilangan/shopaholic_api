import { USER_ROLES } from "../../core/enums/roles.js";

/**
 * Validate if user has user role.
 */
export default (req, res, next) => {
  const role = req.role;

  if (role !== USER_ROLES.R2) {
    return res
      .status(401)
      .json({ success: false, status: 401, message: "Unauthorized." });
  }

  next();
};
