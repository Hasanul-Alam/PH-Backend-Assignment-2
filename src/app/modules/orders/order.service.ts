import type { IOrder } from "./order.interface.js";
import { OrderModel } from "./order.model.js";

const createOrderIntoDB = async (order: IOrder) => {
  const createdOrder = OrderModel.create(order);
  return createdOrder;
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
