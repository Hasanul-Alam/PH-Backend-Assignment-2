import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/products/product.routes.js";
import { OrderRoutes } from "./app/modules/orders/order.routes.js";
const app: Application = express();

// parsers
app.use(cors());
app.use(express.json());

// Application routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
