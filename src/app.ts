import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
const app: Application = express();

// parsers
app.use(cors());
app.use(express.json());

// Application routes
// app.use("/api/v1/students", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
