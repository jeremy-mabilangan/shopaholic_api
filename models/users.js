const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

/**
 * Create user
 */
usersSchema.methods.createUser = function () {
  const name = this.name;
  const email = this.email;
  const password = this.password;

  return bcrypt.hash(password, 12).then((hashedPassword) => {
    const payload = {
      name,
      email,
      password: hashedPassword,
      cart: null,
    };

    return this.model("User").create(payload);
  });
};

/**
 * Login user
 */
usersSchema.static("loginUser", function (email, password) {
  return this.model("User")
    .findOne({ email: email })
    .then((user) => {
      console.log("userSchema.methods.loginUser => ", user);

      // Check if email is existing
      if (user) {
        return bcrypt.compare(password, user.password).then((result) => {
          // Check if password is correct
          if (result) {
            return user;
          } else {
            // Return a message that says password is incorrect.
            return {
              status: false,
              message: "Password is incorrect.",
            };
          }
        });
      } else {
        // Return a message that says user doesn't exist.
        return {
          status: false,
          message: "User doesn't exist.",
        };
      }
    })
    .catch((err) => {
      console.log("userSchema.methods.loginUser error => ", err);
    });
});

/**
 * Add to cart
 * Remove to cart
 * Update quantity of an item in cart
 */
usersSchema.static("updateCart", function (productId, userId, quantity) {
  // Get user by user Id
  return this.model("User")
    .findById(userId)
    .then((user) => {
      return user;
    })
    .then((user) => {
      console.log("userSchema.methods.addToCart => ", user);

      if (user) {
        // Get cart of the user
        const cart = user?.cart || [];

        // Check if cart is not empty and if there's a quantity passed from payload.
        if (cart?.items?.length > 0 && quantity !== null) {
          /**
           * -----------------------
           * Feature: REMOVE TO CART
           * -----------------------
           *
           * 1. If quantity = 0, remove item from cart
           */
          if (quantity === 0) {
            // #1
            const newCartItems = cart?.items?.filter(
              (c) => productId.toString() !== c.product_id.toString()
            );

            user.cart = {
              items: newCartItems,
            };
          } else {
            /**
             * -------------------------------------------
             * Feature: UPDATE QUANTITY OF AN ITEM IN CART
             * -------------------------------------------
             *
             * 1. If item exists, update the quantity of an item
             * 2. If item does not exist, add the item with the defined quantity
             */

            const productIndex = cart?.items?.findIndex(
              (c) => productId.toString() === c.product_id.toString()
            );

            if (productIndex > -1) {
              // #1
              cart.items[productIndex] = {
                product_id: cart.items[productIndex].product_id,
                quantity,
              };

              user.cart = cart;
            } else {
              // #2
              user.cart = {
                items: [
                  ...cart?.items,
                  { product_id: productId, quantity: quantity },
                ],
              };
            }
          }
          // Check if cart is not empty
        } else if (cart?.items?.length > 0) {
          /**
           * -----------------------
           * Feature: ADD TO CART
           * -----------------------
           *
           * 1. If item exists, increment the quantity
           * 2. If item does not exist, add new item to cart with defined quantity else 1
           */

          const productIndex = cart?.items?.findIndex(
            (c) => productId.toString() === c.product_id.toString()
          );

          if (productIndex > -1) {
            // #1
            let productItem = cart?.items[productIndex];
            productItem.quantity = productItem.quantity + 1;
            cart.items[productIndex] = productItem;

            user.cart = cart;
          } else {
            // #2
            user.cart = {
              items: [
                ...cart?.items,
                { product_id: productId, quantity: quantity || 1 },
              ],
            };
          }
        } else {
          /**
           * -----------------------
           * Feature: ADD TO CART
           * -----------------------
           */
          user.cart = {
            items: [{ product_id: productId, quantity: quantity || 1 }],
          };
        }

        return user.save();
      }
    })
    .catch((err) => {
      console.log("userSchema.methods.addToCart error => ", err);
    });
});

/**
 * Get cart
 */
usersSchema.static("fetchCart", function (userId) {
  return this.model("User")
    .findById(userId)
    .populate("cart.items.product_id")
    .then((user) => {
      console.log("userSchema.methods.fetchCart  => ", user);

      const cartItems = user.cart.items || [];

      // Reformat the data of items
      if (cartItems.length) {
        const items = cartItems.reduce((acc, cv) => {
          acc.push({
            product_id: cv.product_id._id,
            name: cv.product_id.name,
            price: cv.product_id.price,
            description: cv.product_id.description,
            imageUrl: cv.product_id.imageUrl,
            quantity: cv.quantity,
          });

          return acc;
        }, []);

        return {
          user,
          cart: {
            items: items,
          },
        };
      } else {
        return {
          cart: null,
        };
      }
    })
    .catch((err) => {
      console.log("userSchema.methods.fetchCart error => ", err);
    });
});

module.exports = model("User", usersSchema);
