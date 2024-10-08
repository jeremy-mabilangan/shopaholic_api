import jwt from "jsonwebtoken";
import config from "../../core/utils/config.js";

export default (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res
      .status(403)
      .json({ success: false, message: "Not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config.JWT_SECRET_KEY);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }

  if (!decodedToken) {
    return res
      .status(403)
      .json({ success: false, message: "Not authenticated." });
  }

  req.userId = decodedToken.userId;
  req.role = decodedToken.role;

  next();
};
