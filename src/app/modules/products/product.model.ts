import { model, Schema } from "mongoose";
import type {
  IProductInventory,
  IProduct,
  IProductVariants,
} from "./product.Interface.js";

const VariantSchema = new Schema<IProductVariants>(
  {
    type: {
      type: String,
      required: [true, "Variant type is required"],
      trim: true,
    },
    value: {
      type: String,
      required: [true, "Variant value is required"],
      trim: true,
    },
  },
  { _id: false }, // no separate _id for each variant
);

const InventorySchema = new Schema<IProductInventory>(
  {
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    variants: {
      type: [VariantSchema],
      default: [],
    },
    inventory: {
      type: InventorySchema,
      required: [true, "Inventory details are required"],
    },
  },
  {
    timestamps: true, // auto manages createdAt & updatedAt
  },
);

const ProductModel = model<IProduct>("Product", ProductSchema);

export default ProductModel;
