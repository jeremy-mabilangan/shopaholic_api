import { Router } from "express";
import {
  addProductSchema,
  editProductSchema,
} from "../middleware/validators/products.validation.js";
import validateRequestSchema from "../middleware/validate-request-schema.js";
import isAuth from "../middleware/is-auth.js";
import isAdmin from "../middleware/is-admin.js";

import ProductController from "../controllers/products.controller.js";
import ProductRepoImpl from "../../data/repositories/mongodb/productsRepoImpl.js";
const controller = new ProductController(new ProductRepoImpl());

const router = Router();

/**
 * Save product
 * /products => POST method
 */
router
  .route("/")
  .post(
    isAuth,
    isAdmin,
    addProductSchema,
    validateRequestSchema,
    controller.postProduct
  );

/**
 * Get all products
 * /products => GET method
 */
router.route("/").get(controller.getProducts);

/**
 * Get product by product id
 * /products/:productId => GET method
 */
router.route("/:productId").get(controller.getProductById);

/**
 * Edit product by product id
 * /products/edit/:productId => POST method
 */
router
  .route("/edit/:productId")
  .post(
    isAuth,
    isAdmin,
    editProductSchema,
    validateRequestSchema,
    controller.editProduct
  );

/**
 * Delete product
 * /products/delete => POST method
 */
router
  .route("/delete/:productId")
  .delete(isAuth, isAdmin, controller.deleteProductById);

export default router;
