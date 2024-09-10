const database = require("../util/database").database;
const mongodb = require("mongodb");
const User = require("./user");

const ObjectId = mongodb.ObjectId;

/**
 * Model for user APIs
 *
 * - Add to cart
 */
class Cart {
  constructor(userId) {
    this.userId = userId;
  }

  /**
   * Model of add to cart.
   */
  async addToCart(productId) {
    const db = database();

    // Get user by user Id
    const user = await User.getById(this.userId);

    if (user) {
      // Get cart of the user
      const cart = user?.cart || [];
      let updatedCart;

      // Check if cart is not empty
      if (cart?.items?.length > 0) {
        const productIndex = cart?.items?.findIndex(
          (c) => productId.toString() === c.product_id.toString()
        );

        if (productIndex > -1) {
          // Increment quantity of an item in cart
          let productItem = cart?.items[productIndex];
          productItem.quantity = productItem.quantity + 1;
          cart.items[productIndex] = productItem;

          updatedCart = cart;
        } else {
          // Add new item in cart
          updatedCart = {
            items: [
              ...cart?.items,
              { product_id: new ObjectId(productId), quantity: 1 },
            ],
          };
        }
      } else {
        // Add first item in cart
        updatedCart = {
          items: [{ product_id: new ObjectId(productId), quantity: 1 }],
        };
      }

      return db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(this.userId) },
          { $set: { cart: updatedCart } }
        )
        .then((result) => {
          console.log("cart addToCart => ", result);
        })
        .catch((err) => {
          console.log("cart addToCart error => ", err);
        });
    }
  }
}

module.exports = Cart;
