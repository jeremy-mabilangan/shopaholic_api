import { validationResult } from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ success: false, status: 422, errors: errors.array() });
  }

  next();
};
