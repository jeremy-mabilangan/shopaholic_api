import mongoose from "mongoose";
import { OrderEntities } from "../entities/orders.entities.js";

const { Schema, model } = mongoose;

const ordersSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default model("Order", ordersSchema);

export const Mapper = {
  toDtoCreation: (payload) => {
    return {
      user_id: payload.userId,
      status: payload.status,
      total_amount: payload.totalAmount,
      items: payload.cartItems,
    };
  },

  toEntity: (model) =>
    new OrderEntities(
      model._id.toString(),
      model.user_id,
      model.status,
      model.total_amount,
      model.items
    ),
};
