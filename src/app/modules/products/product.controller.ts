import type { Request, Response } from "express";
import { ProductServices } from "./product.service.js";
import { productValidationSchema } from "./product.validation.js";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product: productData } = req.body;

    // Validation using joi
    const { error: validatoinError, value } = productValidationSchema.validate(
      productData,
      {
        abortEarly: false, // to get all validation errors
      },
    );

    if (validatoinError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validatoinError.details.map((err) => err.message),
        data: null,
      });
      return; // stop here
    }

    const result = await ProductServices.createProductIntoDB(value);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
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
