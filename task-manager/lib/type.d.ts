import { z } from "zod";
import { statusEnumSchema, createTaskSchema, updateTaskSchema } from "./schema";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "Todo" | "In Progress" | "Completed";
};

export type StatusEnum = z.infer<typeof statusEnumSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;