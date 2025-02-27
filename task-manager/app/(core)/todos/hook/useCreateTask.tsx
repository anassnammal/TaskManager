import { useState } from "react";
import { Task } from "../component/columns";

export default function useCreateTasks() {
  const [data, setData] = useState<Task | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(true);

  const createTask = async (data: Task) => {
    setPending(true);
    setError(undefined);

    try {
      const res = await fetch(`http://localhost:5000/tasks/`, {
        method: "POST",
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

  return {createTask, data, error, pending};
}
