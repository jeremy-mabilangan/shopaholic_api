import Orders, { Mapper } from "../../models/orders.model.js";

export default class OrdersRepoImpl {
  /**
   * @param { userId, status, totalAmount, items } payload
   * @returns true | false
   */
  create = async (payload) => {
    const doc = await Orders.create(Mapper.toDtoCreation(payload));
    return doc ? true : false;
  };

  /**
   * @returns Users entities
   */
  findAll = async () => {
    const docs = await Orders.find();
    return docs ? docs.map((doc) => Mapper.toEntity(doc)) : null;
  };

  /**
   * @param {string} userId - User id from token
   * @returns User entities
   */
  findAllByUserId = async (userId) => {
    const docs = await Orders.find({ user_id: userId });
    return docs ? docs.map((doc) => Mapper.toEntity(doc)) : null;
  };

  /**
   *
   * @param { object } filter
   * @param { object } payload
   * @returns User entity
   */
  updateOne = async (filter, payload) => {
    const doc = await Orders.findOneAndUpdate(filter, payload, {
      new: true,
      upsert: true,
    });

    return doc ? Mapper.toEntity(doc) : null;
  };
}
