const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/user");

/**
 * Save user
 *
 * /user => POST method
 */
router.post("/", UserControllers.postUser);

/**
 * Get user by user id
 *
 * /user/:userId => GET method
 */
router.get("/:userId", UserControllers.getUserById);

module.exports = router;
