import {useState, useEffect} from "react";
import { Task } from "../component/columns";

const fetchTask = async (id: string) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    if (!res.ok) throw Error('An error occured while fetching tasks')
    return await res.json();
}

export default function useGetTasks(id: string) {
    const [data, setData] = useState<Task | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchTask(id).then(data => setData(data.data))
            .catch(error => setError((error as Error).message))
                .finally(() => setPending(false))
    }, [])

    return [data, error, pending]
}