const User = require("../models/user");

/**
 * Controller for adding a user.
 */
exports.postUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const user = new User(name, email);

  user
    .save()
    .then(() => {
      res.json({ status: 200, message: "Added User Successfully" });
    })
    .catch(() => {
      res.json({ status: 400 });
    });
};

/**
 * Controller for fetching user using user id.
 */
exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.getById(userId)
    .then((user) => {
      res.send({ status: 200, user });
    })
    .catch(() => {
      res.send({ status: 400 });
    });
};
