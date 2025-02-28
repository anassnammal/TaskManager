import { z } from "zod";

export const statusEnumSchema = z.enum(["Todo", "In Progress", "Completed"]);

export const createTaskSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string(),
    status: statusEnumSchema,
}).strict();

export const updateTaskSchema = createTaskSchema.partial();