const database = require("../util/database").database;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

/**
 * Model for user APIs
 *
 * - Save user
 * - Find user by id
 */
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  /**
   * Model of saving user.
   */
  save() {
    const db = database();

    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("user save => ", result);
      })
      .catch((err) => {
        console.log("user save error => ", err);
      });
  }

  /**
   * Model of fetching user.
   */
  static getById(userId) {
    const db = database();

    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log("user getById => ", user);
        return user;
      })
      .catch((err) => {
        console.log("user getById error => ", err);
      });
  }
}

module.exports = User;
