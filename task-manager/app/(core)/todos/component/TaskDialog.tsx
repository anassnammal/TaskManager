"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task, CreateTask, UpdateTask } from "@/lib/type";
import { useEffect, useState } from "react";
import useCreateTasks from "../hook/useCreateTask";
import useUpdateTasks from "../hook/useUpdateTask";
import { createTaskSchema, statusEnumSchema, updateTaskSchema } from "@/lib/schema";

interface TaskDialogProps {
  data?: Task;
}

export function TaskDialog(task: TaskDialogProps) {
  
  const [data, setData] = useState<UpdateTask | CreateTask>(
    task.data ?? { title: "", description: "", status: "Todo" }
  );

  const {createTask, data: createdData, error: createError, pending: createPending} = useCreateTasks();
  const {updateTask, data: updatedData, error: updateError, pending: updatePending} = useUpdateTasks();

  const handleSubmit = () => {
    if (task.data) {
      const validated = updateTaskSchema.parse(data);
      updateTask(validated);
    } else {
      const validated = createTaskSchema.parse(data);
      createTask(validated);
    }
  }



  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>Task</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
            }
            value={data.description}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select
            onValueChange={(value) => {
              const parsedStatus = statusEnumSchema.parse(value);
              setData((prev) => ({ ...prev, status: parsedStatus }))
            }}
            defaultValue={data.status}
          >
            <SelectTrigger
              id="status"
              className="col-span-3"
              defaultValue={data.status}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todo" defaultChecked={true}>
                Todo
              </SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleSubmit} > {task.data ? 'Save changes' : 'Create Task'}</Button>
      </DialogFooter>
    </>
  );
}
