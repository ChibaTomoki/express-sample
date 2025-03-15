import { PrismaClient } from "@prisma/client";
import { TodoDTO } from "./todo.model";

class TodoService {
  constructor(private prisma: PrismaClient) {}

  async getTodos(): Promise<Omit<TodoDTO, "createdAt">[]> {
    const todos = await this.prisma.todos.findMany();

    return todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      done: todo.done,
    }));
  }

  async createTodo(title: string): Promise<Omit<TodoDTO, "createdAt">> {
    const todo = await this.prisma.todos.create({
      data: { title },
    });

    return {
      id: todo.id,
      title: todo.title,
      done: todo.done,
    };
  }

  async updateTodo(
    id: number,
    params: Pick<TodoDTO, "title"> | Pick<TodoDTO, "done">,
  ): Promise<Omit<TodoDTO, "createdAt">> {
    const todo = await this.prisma.todos.update({
      where: { id },
      data: params,
    });

    return {
      id: todo.id,
      title: todo.title,
      done: todo.done,
    };
  }
}
export default TodoService;
