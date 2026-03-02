import { Schema, model } from "mongoose";
import type { IOrder } from "./order.interface.js";

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);

export const OrderModel = model<IOrder>("Order", orderSchema);
