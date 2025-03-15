import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import TodoService from "./todo.service";

class TodoController {
  private todoService: TodoService;

  constructor(private prisma: PrismaClient) {
    this.todoService = new TodoService(this.prisma);
  }

  async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await this.todoService.getTodos();
      res.json(todos);
    } catch (error) {
      if (error instanceof Object && "message" in error) {
        res
          .status(500)
          .json({ message: "Failed to fetch todos", error: error.message });
      } else
        res.status(500).json({
          message: "Failed to fetch todos",
          error: "An error occurred",
        });
    }
  }
}
export default TodoController;
