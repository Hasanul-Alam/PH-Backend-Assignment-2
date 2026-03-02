import type { Request, Response } from "express";
import { createProductIntoDB } from "./product.service.js";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await createProductIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
