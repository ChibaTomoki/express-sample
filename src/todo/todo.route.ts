import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import TodoController from "./todo.controller";

const getTodoRouter = (prisma: PrismaClient) => {
  const router = Router();
  const todoController = new TodoController(prisma);

  // NOTE:
  // コールバック関数の中でメソッド定義した関数を呼び出しているためthisを使って参照先を指定している
  // これでもOK → router.get("/", (req, res) => todoController.getTodos(req, res));
  router.get("/", todoController.getTodos.bind(todoController));
  router.post("/", todoController.createTodo.bind(todoController));
  router.patch("/:id", todoController.updateTodo.bind(todoController));
  router.delete("/:id", todoController.deleteTodo.bind(todoController));
  return router;
};
export default getTodoRouter;
