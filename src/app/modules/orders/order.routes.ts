import express from "express";
import { OrderController } from "./order.controller.js";

const router = express.Router();

router.post("/create-order", OrderController.createOrder);

// get all orders
router.get("/", OrderController.getAllOrders);

export const OrderRoutes = router;
