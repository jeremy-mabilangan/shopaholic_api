import mongoose from "mongoose";
import { ProductEntities } from "../entities/products.entities.js";

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export default model("Product", productsSchema);

export const Mapper = {
  toDtoCreation: (payload) => {
    return {
      name: payload.name,
      price: payload.price,
      description: payload.description,
      imageUrl: payload.imageUrl,
    };
  },

  toEntity: (model) =>
    new ProductEntities(
      model._id.toString(),
      model.name,
      model.price,
      model.description,
      model.imageUrl
    ),
};
