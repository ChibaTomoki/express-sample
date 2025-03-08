import { Prisma } from "@prisma/client";

export type TodoDTO = Prisma.todosGetPayload<object>;
