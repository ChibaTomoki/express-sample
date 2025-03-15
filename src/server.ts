import express from "express";
import getTodoRouter from "./todo/todo.route";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Express Server is running");
});

app.use("/api/v1/todos", getTodoRouter(prisma));

app.listen(process.env.PORT || 3000, () => {
  if (!process.env.PORT)
    console.log("Server is running on http://localhost:3000");
});
