import { Request, Response } from "express";
import { getTodos as getTodoServices } from "../services/todos.service";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await getTodoServices();
    res.json(todos);
  } catch (error) {
    if (error instanceof Object && "message" in error) {
      res
        .status(500)
        .json({ message: "Failed to fetch todos", error: error.message });
    } else
      res
        .status(500)
        .json({ message: "Failed to fetch todos", error: "An error occurred" });
  }
};
