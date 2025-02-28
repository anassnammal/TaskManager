import {useState, useEffect} from "react";
import { Task } from "@/lib/type";

const fetchTasks = async () => {
    const res = await fetch('http://localhost:5154/tasks');
    if (!res.ok) throw Error('An error occured while fetching tasks')
    return await res.json();
}

export default function useGetTasks() {
    const [data, setData] = useState<Task[] | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchTasks().then(data => setData(data.data))
            .catch(error => setError((error as Error).message))
                .finally(() => setPending(false))
    }, [])

    return {data, error, pending}
}