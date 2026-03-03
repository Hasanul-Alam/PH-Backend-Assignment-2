import ProductModel from "../products/product.model.js";
import type { IOrder } from "./order.interface.js";
import { OrderModel } from "./order.model.js";

export const createOrderIntoDB = async (orderData: IOrder) => {
  // Fetch product
  const product = await ProductModel.findById(orderData.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // Check availability
  if (
    !product.inventory.inStock ||
    product.inventory.quantity < orderData.quantity
  ) {
    throw new Error(
      `Product is not available or insufficient quantity. Available: ${product.inventory.quantity}`,
    );
  }

  // Calculate total price (optional: use product.price instead of client price)
  const totalPrice = product.price * orderData.quantity;

  // Create order
  const order = await OrderModel.create({
    ...orderData,
    price: totalPrice,
  });

  // Reduce product quantity
  product.inventory.quantity -= orderData.quantity;

  // Update availability if quantity is now 0
  if (product.inventory.quantity === 0) {
    product.inventory.inStock = false;
  }

  await product.save(); // persist changes

  return order;
};

const getAllOrdersFromDB = async () => {
  const allOrders = await OrderModel.find();
  return allOrders;
};

const getOrderByEmailFromDB = async (email: string) => {
  const orders = await OrderModel.find({ email });
  return orders;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrderByEmailFromDB,
};
