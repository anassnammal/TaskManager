import { Request, Response } from "express";
import prisma from "../sevice/prismaClient";

export async function getTasks(req: Request, res: Response) {
    try {
        const tasks = await prisma.task.findMany();
        console.log('here')
        res.status(200).send({
            status: 'success',
            data: tasks,
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: (error as Error).message,
        });
    }
}

export async function getTask(req: Request, res: Response) {
    const { id } = req.params;
    try {
        if (!id ) throw Error('Not found: missing Id')
        const tasks = await prisma.task.findFirstOrThrow({
            where: {id }
        });
        console.log('here')
        res.status(200).send({
            status: 'success',
            data: tasks,
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: (error as Error).message,
        });
    }
}

export async function createTask(req: Request, res: Response) {
    try {
        const task = await prisma.task.create({
            data: req.body,
        });

        res.status(201).send({
            status: 'success',
            data: task,
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: (error as Error).message,
        });
    }
}

export async function updateTask(req: Request, res: Response) {
    const { id } = req.params;
    try {
        console.log('hee', id)
        if (!id ) throw Error('Not found: missing Id')
        const task = await prisma.task.update({
            where: { id: id },
            data: req.body,
        })

        res.status(200).send({
            status: 'success',
            data: task,
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: (error as Error).message,
        });
    }
}

export async function deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    try {
        if (!id) throw Error('Not found: missing Id')
        await prisma.task.delete({
            where: { id }
        })

        res.status(200).send({
            status: 'success',
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: (error as Error).message,
        });
    }
}