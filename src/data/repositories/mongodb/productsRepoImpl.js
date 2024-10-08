import Products, { Mapper } from "../../models/products.model.js";

export default class ProductsRepoImpl {
  /**
   * Create product
   *
   * @param { name, description, price, imageUrl } payload
   * @returns boolean
   */
  create = async (payload) => {
    const doc = await Products.create(Mapper.toDtoCreation(payload));
    return doc ? true : false;
  };

  /**
   * Get all products
   *
   * @returns Users entities
   */
  findAll = async () => {
    const docs = await Products.find();
    return docs ? docs.map((doc) => Mapper.toEntity(doc)) : null;
  };

  /**
   * Get product by id
   *
   * @param { object } query
   * @returns Product entities | null
   */
  findOne = async (query) => {
    const doc = await Products.findOne(query);

    return doc ? Mapper.toEntity(doc) : null;
  };

  /**
   * Update product
   *
   * @param { object } filter
   * @param { object } payload
   * @returns Product entities
   */
  updateOne = async (filter, payload) => {
    const doc = await Products.findOneAndUpdate(
      filter,
      Mapper.toDtoCreation(payload),
      {
        new: true,
        upsert: true,
      }
    );

    return doc ? Mapper.toEntity(doc) : null;
  };

  /**
   * Delete product by id
   *
   * @param { string } id
   * @returns boolean
   */
  findByIdAndDelete = async (id) => {
    const doc = await Products.findByIdAndDelete(id);

    return doc ? true : false;
  };
}
