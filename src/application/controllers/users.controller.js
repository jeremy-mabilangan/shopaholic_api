import { USER_ROLES } from "../../core/enums/roles.js";
import {
  compareHash,
  generateHash,
  generateToken,
} from "../../core/utils/util.js";

export default class UserController {
  constructor(UsersOrdersRepoImpl) {
    this.repository = UsersOrdersRepoImpl;
  }

  /**
   * Create user
   */
  createUser = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = USER_ROLES[req.body.role]
      ? USER_ROLES[req.body.role]
      : USER_ROLES.R2;

    // Hash password using bcrypt
    const hashedPassword = await generateHash(password);

    const payload = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    this.repository
      .create(payload)
      .then((result) => {
        console.log("UserController createUser result => ", result);
        res
          .status(201)
          .json({ status: 201, message: "Added User Successfully" });
      })
      .catch((err) => {
        console.log("UserController createUser error => ", err);
        res.status(400).json({ status: 400, message: "Failed to add user" });
      });
  };

  /**
   * Login user
   */
  loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let response;

    this.repository
      .findOne({ email })
      .then(async (user) => {
        console.log("UserController loginUser result => ", user);
        if (user) {
          await compareHash(password, user.password).then(async (result) => {
            // Check if password is correct
            if (result) {
              // Generate a token
              const token = await generateToken({
                email: email,
                role: user.role,
                userId: user.id,
              });

              response = { success: true, status: 200, token };
            } else {
              // Return a message that says password is incorrect.
              response = {
                success: false,
                status: 400,
                message: "Password is incorrect.",
              };
            }

            res.status(response.status).json(response);
          });
        } else {
          // Return a message that says user doesn't exist.
          res.status(400).json({
            success: false,
            status: 400,
            message: "User doesn't exist.",
          });
        }
      })
      .catch((err) => {
        console.log("UserController loginUser error => ", err);
        res
          .status(400)
          .json({ success: false, status: 400, message: "Failed to login" });
      });
  };

  /**
   * Add to cart
   * Remove to cart
   * Update quantity of an item in cart
   */
  updateCart = async (req, res) => {
    const userId = req.userId;
    const productId = req.body.product_id;
    const quantity = req.body.quantity ?? null;
    let cartPayload;

    // Get user details
    const user = await this.repository.findOne({ _id: userId });
    console.log("user ", user);
    if (user) {
      // Cart items
      const cart = user?.cart || [];

      // Check if cart is not empty and if there's a quantity passed from payload.
      if (cart?.items?.length > 0 && quantity !== null) {
        /**
         * -----------------------
         *     REMOVE TO CART
         * -----------------------
         */
        if (quantity === 0) {
          // If quantity = 0, remove item from cart
          const newCartItems = cart?.items?.filter(
            (c) => productId.toString() !== c.product_id.toString()
          );

          cartPayload = {
            items: newCartItems,
          };
        } else {
          /**
           * -------------------------------------------
           *     UPDATE QUANTITY OF AN ITEM IN CART
           * -------------------------------------------
           */

          const productIndex = cart?.items?.findIndex(
            (c) => productId.toString() === c.product_id.toString()
          );

          if (productIndex > -1) {
            // If item exists, update the quantity of an item
            cart.items[productIndex] = {
              product_id: cart.items[productIndex].product_id,
              quantity,
            };

            cartPayload = cart;
          } else {
            // If item does not exist, add the item with the defined quantity
            cartPayload = {
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
         *       ADD TO CART
         * -----------------------
         */

        const productIndex = cart?.items?.findIndex(
          (c) => productId.toString() === c.product_id.toString()
        );

        if (productIndex > -1) {
          // If item exists, increment the quantity
          let productItem = cart?.items[productIndex];
          productItem.quantity = productItem.quantity + 1;
          cart.items[productIndex] = productItem;

          cartPayload = cart;
        } else {
          // If item does not exist, add new item to cart with defined quantity else 1
          cartPayload = {
            items: [
              ...cart?.items,
              { product_id: productId, quantity: quantity || 1 },
            ],
          };
        }
      } else {
        /**
         * -----------------------
         *      ADD TO CART
         * -----------------------
         */
        cartPayload = {
          items: [{ product_id: productId, quantity: quantity || 1 }],
        };
      }
    }

    if (cartPayload) {
      this.repository
        .updateOne({ _id: userId }, { cart: cartPayload })
        .then((result) => {
          console.log("UserController updateCart result => ", result);

          res.status(201).json({
            success: true,
            message: "Cart updated successfully",
            cart: result.cart,
          });
        })
        .catch((err) => {
          console.log("UserController updateCart error => ", err);

          res.status(400).json({
            success: false,
            message: "Failed to update cart",
          });
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };

  getUserById = async (req, res) => {
    const userId = req.userId;

    this.repository
      .findById(userId)
      .then((result) => {
        console.log("UserController getUserById result => ", result);

        const userRes = this.generateUserResponse(result);

        res.status(200).json({
          success: true,
          user: userRes,
        });
      })
      .catch((err) => {
        console.log("UserController getUserById error => ", err);

        res.status(400).json({
          success: false,
          message: "Failed to get user details",
        });
      });
  };

  // Helper functions
  generateUserResponse(user) {
    return {
      ...user,
      password: undefined,
    };
  }

  getCart = async (req, res) => {
    const userId = req.userId;

    this.repository
      .findById(userId, "cart")
      .then((user) => {
        console.log("UserController getCart result => ", user);

        res.status(200).json({
          success: true,
          cart: user?.cart || null,
        });
      })
      .catch((err) => {
        console.log("UserController getCart error => ", err);

        res.status(400).json({
          success: false,
          message: "Failed to get cart",
        });
      });
  };
}
