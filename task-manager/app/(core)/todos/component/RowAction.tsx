import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/DialogProvider";
import { MoreHorizontal } from "lucide-react";

import { Task } from "./columns";

export default function RowAction({ task }: { task: Task }) {
  const { setOpen, setTask } = useDialog();

  const updateTask = () => {
    if (task) {
      setTask(task);
      setOpen(true);
    }
  };

  const deleteTask = async (id: string) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    if (!res.ok) throw Error('An error occured while fetching tasks')
    return await res.json();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => updateTask()}>
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => deleteTask(task.id)}>Delete Task</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
