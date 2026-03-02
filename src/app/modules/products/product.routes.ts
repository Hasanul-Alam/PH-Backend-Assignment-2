import express from "express";
import { ProductControllers } from "./product.controller.js";

const router = express.Router();

router.post("/create-product", ProductControllers.createProduct);

router.get("/", ProductControllers.getAllProducts);

router.get("/:productId", ProductControllers.getSingleProduct);

router.put("/:productId", ProductControllers.updateProduct);

router.delete("/:productId", ProductControllers.deleteProduct);

// Search Products by name or category
// router.get("/search", ProductControllers.searchProducts);

export const ProductRoutes = router;
