import { Router, Response, Request } from "express";
import taskRouter from "./task.routes";
import authMidleware from "../midleware/auth";

const indexRouter = Router();

indexRouter.get('', (req: Request, res: Response) => {
    res.send('welcom to task api');
})

indexRouter.use('/tasks', taskRouter);

export default indexRouter