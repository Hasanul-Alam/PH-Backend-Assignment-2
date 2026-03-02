import type { IOrder } from "./order.interface.js";
import { OrderModel } from "./order.model.js";

const createOrderIntoDB = async (order: IOrder) => {
  const createdOrder = OrderModel.create(order);
  return createdOrder;
};

export const OrderServices = {
  createOrderIntoDB,
};
