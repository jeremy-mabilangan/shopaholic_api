import jwt from "jsonwebtoken";
import config from "../../core/utils/config.js";

export default (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ status: 401, message: "Not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(500).json({ status: 500, ...err });
  }

  if (!decodedToken) {
    return res.status(401).json({ status: 401, message: "Not authenticated." });
  }

  req.userId = decodedToken.userId;
  req.role = decodedToken.role;

  next();
};
