export default class ProductsController {
  constructor(ProductsRepoImpl) {
    this.repository = ProductsRepoImpl;
  }

  postProduct = (req, res) => {
    const payload = req.body;

    this.repository
      .create(payload)
      .then((result) => {
        console.log("ProductsController postProduct result => ", result);

        res
          .status(201)
          .json({ success: true, message: "Product added successfully." });
      })
      .catch((err) => {
        console.log("ProductsController postProduct error => ", err);

        res
          .status(400)
          .json({ success: false, message: "Failed to add product." });
      });
  };

  getProducts = (req, res) => {
    this.repository
      .findAll()
      .then((products) => {
        console.log("ProductsController getProducts result => ", products);

        res.status(201).json({ success: true, products });
      })
      .catch((err) => {
        console.log("ProductsController getProducts error => ", err);

        res
          .status(400)
          .json({ success: false, message: "Failed to get all products." });
      });
  };

  getProductById = (req, res) => {
    const { productId } = req.params;

    this.repository
      .findOne({ _id: productId })
      .then((product) => {
        console.log("ProductsController getProductById result => ", product);

        res.status(200).json({ success: true, product });
      })
      .catch((err) => {
        console.log("ProductsController getProductById error => ", err);

        res
          .status(400)
          .json({ success: false, message: "Failed to get product." });
      });
  };

  editProduct = (req, res) => {
    const { productId } = req.params;
    const payload = req.body;

    this.repository
      .updateOne({ _id: productId }, payload)
      .then((product) => {
        res.status(201).json({
          success: true,
          message: "Product updated successfully.",
          product,
        });
      })
      .catch((err) => {
        console.log("ProductsController editProduct error => ", err);
        res
          .status(400)
          .json({ success: false, message: "Failed to update product." });
      });
  };

  deleteProductById = (req, res) => {
    const { productId } = req.params;

    this.repository
      .findByIdAndDelete(productId)
      .then((result) => {
        console.log("ProductsController deleteProductById result => ", result);
        if (result) {
          res
            .status(200)
            .json({ success: true, message: "Product deleted successfully." });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Product not found." });
        }
      })
      .catch((err) => {
        console.log("ProductsController deleteProductById error => ", err);
        res
          .status(400)
          .json({ success: false, message: "Failed to delete product." });
      });
  };
}
