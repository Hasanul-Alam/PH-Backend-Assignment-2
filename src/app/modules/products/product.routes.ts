import express from "express";
import { ProductControllers } from "./product.controller.js";

const router = express.Router();

router.post("/create-product", async (req, res) => {
  res.send("Create product route");
});

router.get("/", ProductControllers.getAllProducts);

export const ProductRoutes = router;
