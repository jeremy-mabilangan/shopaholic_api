const Product = require("../models/products");

/**
 * Controller for adding a product.
 */
exports.postProduct = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const product = new Product({
    name,
    description,
    price,
    imageUrl,
  });

  product
    .save()
    .then(() => {
      res.json({ status: 200, message: "Added Product Successfully" });
    })
    .catch(() => {
      res.json({ status: 400, message: "Failed to add product" });
    });
};

/**
 * Controller for fetching all products.
 */
exports.getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.send({ status: 200, products });
    })
    .catch(() => {
      res.send({ status: 400, message: "Failed to get all products" });
    });
};

/**
 * Controller for fetching one product using product id.
 */
exports.getProductById = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      res.send({ status: 200, product });
    })
    .catch(() => {
      res.send({ status: 400, message: "Failed to get product" });
    });
};

/**
 *
 * Controller for editing product.
 */
exports.editProduct = (req, res) => {
  const { productId } = req.params;

  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  Product.findById(productId)
    .then((product) => {
      product.name = name;
      product.description = description;
      product.price = price;
      product.imageUrl = imageUrl;

      return product.save();
    })
    .then((product) => {
      res.send({ status: 200, product });
    })
    .catch(() => {
      res.send({ status: 400, message: "Failed to update product" });
    });
};

/**
 * Controller for deleting one product using product id.
 */
exports.deleteProductById = (req, res) => {
  const { productId } = req.params;

  Product.findByIdAndDelete(productId)
    .then(() => {
      res.send({ status: 200, message: "Deleted Successfully" });
    })
    .catch(() => {
      res.send({ status: 400, message: "Failed to delete product" });
    });
};
