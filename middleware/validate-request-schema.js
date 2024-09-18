const { validationResult } = require("express-validator");

function validateRequestSchema(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ status: 422, errors: errors.array() });
  }

  next();
}

exports.validateRequestSchema = validateRequestSchema;
