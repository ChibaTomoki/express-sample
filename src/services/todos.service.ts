import { PrismaClient } from "@prisma/client";
import { TodoDTO } from "../models/todo.model";

const prisma = new PrismaClient();

export const getTodos = async (): Promise<Omit<TodoDTO, "created_at">[]> => {
  const todos = await prisma.todos.findMany();

  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    done: todo.done,
  }));
};
