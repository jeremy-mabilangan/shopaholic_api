const database = require("../util/database").database;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

/**
 * Model for user APIs
 *
 * - Save user
 * - Find user by id
 */
class Cart {
  constructor(userId) {
    this.userId = userId;
  }

  /**
   * Model of add to cart.
   */
  addToCart(productId) {
    const db = database();

    const updatedCart = {
      items: [{ product_id: new ObjectId(productId), quantity: 1 }],
    };

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this.userId) },
        { $set: { cart: updatedCart } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Cart;
