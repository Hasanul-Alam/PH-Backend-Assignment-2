import type { Request, Response } from "express";
import { orderValidationSchema } from "./order.validation.js";
import { OrderServices } from "./order.service.js";
import { ProductServices } from "../products/product.service.js";

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    // destructure order data from request body
    const { order } = req.body;
    // validate order data
    const { error: orderValidationError, value } =
      orderValidationSchema.validate(order, {
        abortEarly: false,
      });

    // if validation error, return 400 with error details
    if (orderValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: orderValidationError.details.map((err) => err.message),
        data: null,
      });
      return;
    }

    // create order in database
    const result = await OrderServices.createOrderIntoDB(value);

    // return success response with created order data
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
