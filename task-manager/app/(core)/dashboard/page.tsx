"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/lib/type";

const getDataStatistics = (data: Task[] | null) => {
  const statistics = {
    total: data?.length ?? 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
  }
  data?.forEach(t => {
    if (t.status === 'Todo') statistics.todo += 1;
    else if (t.status === 'In Progress') statistics.inProgress += 1;
    else if (t.status === 'Completed') statistics.completed += 1;
  })
  return statistics;
}

export default function Home() {
  const statistics = getDataStatistics(null)
  return (
    <div className="grid grid-cols-3 container mx-auto py-10 gap-2">
      <div className="col-span-3 text-center text-3xl pb-4 font-bold">
        <h1>Dashboard</h1>
      </div>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{statistics.total}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{statistics.todo}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{statistics.inProgress}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{statistics.completed}</p>
        </CardContent>
      </Card>
    </div>
  );
}
