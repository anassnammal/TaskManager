import { useState } from "react";
import { Task, UpdateTask } from "@/lib/type";

export default function useUpdateTasks() {
  const [data, setData] = useState<Task | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(true);

  const updateTask = async (data: UpdateTask, id: string) => {
    setPending(true);
    setError(undefined);
    try {
      const res = await fetch(`http://localhost:5154/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw Error("An error occured while fetching tasks");
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

  return {updateTask, data, error, pending};
}
