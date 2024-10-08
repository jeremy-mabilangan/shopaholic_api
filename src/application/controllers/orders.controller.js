import { USER_ROLES } from "../../core/enums/roles.js";

export default class OrderController {
  constructor(OrdersRepoImpl, UserRepoImpl) {
    this.orderRepository = OrdersRepoImpl;
    this.userRepository = UserRepoImpl;
  }

  postOrder = async (req, res) => {
    const userId = req.userId;
    const cartPayload = req.body.cart;

    const user = await this.userRepository.findById(userId, "cart");
    const cartItems = user.cart;
    const cartObj = new Map();

    let isPayloadItemsValid = true;

    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        cartObj.set(cartItems[i].product_id, cartItems[i]);
      }

      for (let j = 0; j < cartPayload.length; j++) {
        if (!cartObj.get(cartPayload[j].product_id)) {
          isPayloadItemsValid = false;
        }
      }

      if (isPayloadItemsValid) {
        const totalAmount = cartPayload.reduce(
          (acc, cv) => acc + cv.price * cv.quantity,
          0
        );

        // Payload for creating an order
        const payload = {
          userId,
          status: "pending",
          totalAmount,
          cartItems: cartPayload,
        };

        await this.orderRepository.create(payload);
        await this.userRepository.updateOne({ _id: userId }, { cart: null });

        return res.status(200).json({
          success: true,
          message: "Order created successfully.",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid items.",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Cart is empty.",
      });
    }
  };

  getOrder = async (req, res) => {
    const userId = req.userId;
    let fn;

    if (req.role === USER_ROLES.R1) {
      // Admin
      // Get all orders
      fn = this.orderRepository.findAll();
    } else if (req.role === USER_ROLES.R2) {
      // User
      // Get orders by user
      fn = this.orderRepository.findAllByUserId(userId);
    } else {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Unauthorized.",
      });
    }

    fn.then((result) => {
      res
        .status(200)
        .json({ success: true, status: 200, result: result || [] });
    }).catch(() => {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Failed to get order.",
      });
    });
  };

  updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const status = req.body.status;

    this.orderRepository
      .updateOne({ _id: orderId }, { status: status })
      .then((result) => {
        console.log("OrderController updateOrderStatus result => ", result);
        res.status(201).json({
          success: true,
          message: "Order status updated successfully.",
        });
      })
      .catch((err) => {
        console.log("OrderController updateOrderStatus error => ", err);

        res
          .status(400)
          .json({ success: false, message: "Failed to update status." });
      });
  };
}
