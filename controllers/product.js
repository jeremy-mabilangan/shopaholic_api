const Product = require("../models/product");

/**
 * Controller for adding a product.
 */
exports.postProduct = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const id = req.body.id || "";

  const product = new Product(name, description, price, imageUrl, id);

  product
    .save()
    .then(() => {
      res.json({ status: 200, message: "Added Product Successfully" });
    })
    .catch(() => {
      res.json({ status: 400 });
    });
};

/**
 * Controller for fetching all products.
 */
exports.getProducts = (req, res, next) => {
  Product.getAll()
    .then((products) => {
      res.send({ status: 200, products });
    })
    .catch(() => {
      res.send({ status: 400 });
    });
};

/**
 * Controller for fetching one product using product id.
 */
exports.getProductById = (req, res, next) => {
  const { productId } = req.params;

  Product.getById(productId)
    .then((products) => {
      res.send({ status: 200, products });
    })
    .catch(() => {
      res.send({ status: 400 });
    });
};

/**
 * Controller for deleting one product using product id.
 */
exports.deleteProductById = (req, res, next) => {
  const productId = req.body.id;

  Product.deleteById(productId)
    .then(() => {
      res.send({ status: 200, message: "Deleted Successfully" });
    })
    .catch(() => {
      res.send({ status: 400 });
    });
};
