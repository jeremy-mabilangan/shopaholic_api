import { Router } from "express";
import productRoutes from "./products.router.js";
import userRoutes from "./users.router.js";
import orderRoutes from "./orders.router.js";

const router = Router();

// Init user APIs route
router.use("/users", userRoutes);
// Init product APIs route
router.use("/products", productRoutes);
// Init orders APIs route
router.use("/orders", orderRoutes);

export default router;
