import Express from 'express';
import { Request, Response } from 'express';
import indexRouter from './route';
import cors from 'cors'


const app = Express();

app.use(cors({origin: '*'}))

app.use(Express.json());


const port = process.env.PORT || 5000;

app.use(indexRouter);

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});