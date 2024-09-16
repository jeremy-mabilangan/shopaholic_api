const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ordersSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

/**
 * Create an order
 */
ordersSchema.static("createOrder", function (userId) {
  // Get user by user Id
  return this.model("User")
    .fetchCart(userId)
    .then((result) => {
      return result;
    })
    .then((result) => {
      console.log("orderSchema.methods.createOrder => ", result);

      // Reformat the data
      const cartItems = result?.cart?.items || [];

      if (cartItems.length) {
        // Total amount of all items
        const totalAmount = cartItems.reduce((acc, cv) => acc + cv.price, 0);

        // Payload for creating an order
        const payload = {
          user_id: userId,
          status: "pending",
          total_amount: totalAmount,
          items: cartItems,
        };

        console.log("payload", payload);

        // Clear cart
        result.user.cart = null;
        result.user.save();

        // Create Order
        return this.model("Order").create(payload);
      } else {
        return {
          status: false,
          message: "Cart is empty",
        };
      }
    })
    .catch((err) => {
      console.log("userSchema.methods.createOrder error => ", err);
    });
});

module.exports = model("Order", ordersSchema);
