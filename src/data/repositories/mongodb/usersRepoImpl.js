import User, { Mapper } from "../../models/users.model.js";

export default class UsersRepoImpl {
  /**
   * @param { name = string, email = string,
   *          password = hash<string>, role = "admin" | "user",
   *          cart = null } payload
   * @returns true | false
   */
  create = async (payload) => {
    const doc = await User.create(Mapper.toDtoUserCreation(payload));
    return doc ? true : false;
  };

  /**
   * @returns Users entities | null
   */
  findAll = async () => {
    const docs = await User.find();
    return docs ? docs.map((doc) => Mapper.toEntity(doc)) : null;
  };

  /**
   * @param { string } userId - User id
   * @returns User entities | null
   */
  findById = async (userId, requestFrom = "") => {
    let doc;

    if (requestFrom === "cart") {
      doc = await User.findById(userId)
        .populate("cart.items.product_id") // Populate the product by product id using reference
        .lean(); // Convert to normal Object

      // Reformat cart items
      if (doc?.cart) {
        doc.cart = this.reformatCartItems(doc.cart.items);
      }
    } else {
      doc = await User.findById(userId).select("-cart.items._id"); // Deselect the _id
    }

    return doc ? Mapper.toEntity(doc) : null;
  };

  /**
   * @param { object } query
   * @returns User Entities | null
   */
  findOne = async (query) => {
    const doc = await User.findOne(query);

    return doc ? Mapper.toEntity(doc) : null;
  };

  /**
   *
   * @param { object } filter
   * @param { object } payload
   * @returns User entities
   */
  updateOne = async (filter, payload) => {
    const doc = await User.findOneAndUpdate(filter, payload, {
      new: true,
      upsert: true,
    })
      .populate("cart.items.product_id") // Populate the product by product id using reference;
      .lean(); // Convert to normal Object

    if (doc?.cart) {
      doc.cart["items"] = this.reformatCartItems(doc.cart.items);
    }

    return doc ? Mapper.toEntity(doc) : null;
  };

  /**
   * Reformat cart items
   *
   * @param { array } items
   * @returns formatted cart items
   */
  reformatCartItems(items) {
    return items.reduce((acc, cv) => {
      cv.product_id.quantity = cv.quantity;

      acc.push(Mapper.toUserCartItems(cv.product_id));

      return acc;
    }, []);
  }
}
