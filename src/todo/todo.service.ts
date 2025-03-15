import { PrismaClient } from "@prisma/client";
import { TodoDTO } from "./todo.model";

const prisma = new PrismaClient();

export const getTodos = async (): Promise<Omit<TodoDTO, "createdAt">[]> => {
  const todos = await prisma.todos.findMany();

  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    done: todo.done,
  }));
};
