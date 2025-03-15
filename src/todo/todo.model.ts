import { Prisma } from "@prisma/client";
import { SnakeToCamel } from "types";

export type TodoDAO = Prisma.todosGetPayload<object>;
export type TodoDTO = SnakeToCamel<TodoDAO>;
