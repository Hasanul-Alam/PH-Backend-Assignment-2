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

export const OrderController = {
  createOrder,
};
