import Orders, { Mapper } from "../../models/orders.model.js";

export default class OrdersRepoImpl {
  /**
   * Create order
   *
   * @param { userId, status, totalAmount, items } payload
   * @returns boolean
   */
  create = async (payload) => {
    const doc = await Orders.create(Mapper.toDtoCreation(payload));
    return doc ? true : false;
  };

  /**
   * Get all orders
   *
   * @returns Users entities
   */
  findAll = async () => {
    const docs = await Orders.find();
    return docs ? docs.map((doc) => Mapper.toEntity(doc)) : null;
  };

  /**
   * Get all orders of the user
   *
   * @param {string} userId - User id from token
   * @returns User entities
   */
  findAllByUserId = async (userId) => {
    const docs = await Orders.find({ user_id: userId });
    return docs ? docs.map((doc) => Mapper.toEntity(doc)) : null;
  };

  /**
   * Update orders entity
   *
   * @param { object } filter
   * @param { object } payload
   * @returns Order entities
   */
  updateOne = async (filter, payload) => {
    const doc = await Orders.findOneAndUpdate(filter, payload, {
      new: true,
      upsert: true,
    });

    return doc ? Mapper.toEntity(doc) : null;
  };
}
