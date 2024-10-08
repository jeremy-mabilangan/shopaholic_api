import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "./config.js";

// hash utils
const generateHash = async (input) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(input, salt);

  return hash;
};

const compareHash = async (input, hash) => {
  const match = await bcrypt.compare(input, hash);
  return match;
};

// token utils
const generateToken = (obj) => {
  const token = jwt.sign(obj, config.JWT_SECRET_KEY);
  return token;
};

export { generateHash, compareHash, generateToken };
