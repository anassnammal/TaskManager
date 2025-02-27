import { Router } from "express";

import { createTask, deleteTask, updateTask, getTasks, getTask } from "../controller/task.route";

const taskRouter = Router();

taskRouter.get('', getTasks);
taskRouter.get('/:id', getTask);
taskRouter.post('', createTask);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;