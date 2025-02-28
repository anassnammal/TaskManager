import Z from "zod";

export const statusEnumSchema = Z.enum(["Todo", "In Progress", "Completed"]);

export const createTaskSchema = Z.object({
    title: Z.string().min(3).max(100),
    description: Z.string(),
    dueDate: Z.date().default(() => new Date()),
    status: statusEnumSchema,
}).strict();

export const updateTaskSchema = createTaskSchema.omit({dueDate: true}).partial();