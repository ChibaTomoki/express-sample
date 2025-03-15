import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import getTodoRouter from "./todo/todo.route";

const app = express();
const prisma = new PrismaClient();
const apiV1Router = Router();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express Server is running");
});

apiV1Router.use("/todos", getTodoRouter(prisma));
app.use("/api/v1", apiV1Router);

app.listen(process.env.PORT || 3000, () => {
  if (!process.env.PORT)
    console.log("Server is running on http://localhost:3000");
});
