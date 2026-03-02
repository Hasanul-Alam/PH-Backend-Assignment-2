import type { Request, Response } from "express";
import { orderValidationSchema } from "./order.validation.js";
import { OrderServices } from "./order.service.js";

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { order } = req.body;
    const { error: orderValidationError, value } =
      orderValidationSchema.validate(order, {
        abortEarly: false,
      });
    if (orderValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: orderValidationError.details.map((err) => err.message),
        data: null,
      });
      return;
    }
    const result = await OrderServices.createOrderIntoDB(value);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  // check if email query is present
  const { email } = req.query;

  //   if email query is present, fetch orders by email
  if (email) {
    const orders = await OrderServices.getOrderByEmailFromDB(email as string);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
    return;
  }

  // if no email query, fetch all orders
  try {
    const allOrders = await OrderServices.getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: allOrders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};
export const OrderController = {
  createOrder,
  getAllOrders,
};
