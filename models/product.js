const database = require("../util/database").database;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

/**
 * Model for product APIs
 *
 * - Save/Edit Product
 * - Get all products
 * - Get product by id
 * - Delete product by id
 */
class Product {
  constructor(name, description, price, imageUrl, id) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
  }

  /**
   * Model of saving a single product.
   */
  save() {
    const db = database();
    let dbOp;

    if (this._id) {
      // Update product
      dbOp = db
        .collection("products")
        .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
    } else {
      // Save/Add product
      dbOp = db.collection("products").insertOne({
        name: this.name,
        description: this.description,
        price: this.price,
        imageUrl: this.imageUrl,
      });
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Model of fetching all products.
   */
  static getAll() {
    const db = database();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Model of fetching one product using product id.
   */
  static getById(productId) {
    const db = database();
    return db
      .collection("products")
      .find({ _id: new ObjectId(productId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Model of deleting one product using product id.
   */
  static deleteById(productId) {
    const db = database();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
