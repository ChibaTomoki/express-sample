import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
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
    const bodySchema = z.object({
      title: z.string(),
    });
    const bodyIsValid = (body: unknown): body is z.infer<typeof bodySchema> =>
      bodySchema.safeParse(body).success;
    if (!bodyIsValid(body)) {
      res.status(400).json({ message: "Invalid request body" });
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

  async updateTodo(
    req: Request<{ id: string }, unknown, unknown>,
    res: Response,
  ): Promise<void> {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid todo ID" });
      return;
    }

    const body = req.body;
    const bodySchema = z.union([
      z.object({ title: z.string(), done: z.never() }),
      z.object({ title: z.never(), done: z.boolean() }),
    ]);
    const bodyIsValid = (body: unknown): body is z.infer<typeof bodySchema> =>
      bodySchema.safeParse(body).success;
    if (!bodyIsValid(body)) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    try {
      const todo = await this.todoService.updateTodo(id, body);
      res.status(200).json(todo);
    } catch (error) {
      if (error instanceof Object && "message" in error) {
        res
          .status(500)
          .json({ message: "Failed to update todo", error: error.message });
      } else
        res.status(500).json({
          message: "Failed to update todo",
          error: "An error occurred",
        });
    }
  }
}
export default TodoController;
