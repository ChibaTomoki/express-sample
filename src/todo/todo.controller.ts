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

  async createTodo(
    req: Request<unknown, unknown, unknown>,
    res: Response,
  ): Promise<void> {
    const body = req.body;
    if (!body) {
      res.status(400).json({ message: "Request body is required" });
      return;
    }
    if (typeof body !== "object") {
      res.status(400).json({ message: "Request body must be an object" });
      return;
    }
    if (!("title" in body)) {
      res.status(400).json({ message: "Title is required" });
      return;
    }
    if (typeof body.title !== "string") {
      res.status(400).json({ message: "Title must be a string" });
      return;
    }
    const title = body.title;

    try {
      const todo = await this.todoService.createTodo(title);
      res.status(201).json(todo);
    } catch (error) {
      if (error instanceof Object && "message" in error) {
        res
          .status(500)
          .json({ message: "Failed to create todo", error: error.message });
      } else
        res.status(500).json({
          message: "Failed to create todo",
          error: "An error occurred",
        });
    }
  }
}
export default TodoController;
