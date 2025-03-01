import { useState } from "react";
import { Task, CreateTask } from "@/lib/type";

export default function useCreateTasks() {
  const [data, setData] = useState<Task | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(true);

  const createTask = async (data: CreateTask) => {
    setPending(true);
    setError(undefined);

    try {
      const res = await fetch(`http://localhost:5154/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw Error("An error occured while creating task");
      const result = await res.json();
      setData(result.data);
      return result.data;
    } catch (error) {
      setError((error as Error).message);
      return undefined;
    } finally {
      setPending(false);
    }
  };

  return {createTask, data, error, pending};
}
