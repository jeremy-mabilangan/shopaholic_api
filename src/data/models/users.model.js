import mongoose from "mongoose";
import { UserEntities } from "../entities/users.entities.js";

const { Schema, model } = mongoose;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  cart: {
    items: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

export default model("User", usersSchema);

export const Mapper = {
  toDtoUserCreation: (payload) => {
    return {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      cart: payload.cart,
    };
  },

  toUserCartItems: (item) => {
    return {
      ...(item._id && { product_id: item._id.toString() }),
      ...(item.name && { name: item.name }),
      ...(item.price && { price: item.price }),
      ...(item.description && { description: item.description }),
      ...(item.imageUrl && { imageUrl: item.imageUrl }),
      ...(item.quantity && { quantity: item.quantity }),
    };
  },

  /**
   * Use to return the user entities to API response
   *
   * @param { User doc } model
   * @returns User Entities
   */
  toEntity: (model) =>
    new UserEntities(
      model._id.toString(),
      model.name,
      model.email,
      model.role,
      model.cart,
      model.password
    ),
};
