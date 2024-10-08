import { Router } from "express";
import isAuth from "../middleware/is-auth.js";
import isUser from "../middleware/is-user.js";
import validateRequestSchema from "../middleware/validate-request-schema.js";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../middleware/validators/orders.validation.js";
import OrderController from "../controllers/orders.controller.js";
import OrdersRepoImpl from "../../data/repositories/mongodb/ordersRepoImpl.js";
import UsersRepoImpl from "../../data/repositories/mongodb/usersRepoImpl.js";
import isAdmin from "../middleware/is-admin.js";
const controller = new OrderController(
  new OrdersRepoImpl(),
  new UsersRepoImpl()
);

const router = Router();

/**
 * Create order
 *
 * /orders => POST method
 */
router
  .route("/")
  .post(
    isAuth,
    isUser,
    createOrderSchema,
    validateRequestSchema,
    controller.postOrder
  );

/**
 * Get orders
 *
 * /orders => GET method
 */
router.route("/").get(isAuth, controller.getOrder);

/**
 * Update order status
 *
 * /orders => PUT method
 */
router
  .route("/:orderId")
  .put(
    isAuth,
    isAdmin,
    updateOrderStatusSchema,
    validateRequestSchema,
    controller.updateOrderStatus
  );

export default router;
