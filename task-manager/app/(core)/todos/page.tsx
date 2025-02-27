'use client'

import { Task, columns } from "./component/columns"
import { DataTable } from "./component/data-table"
import useGetTasks from "./hook/useGetTasks"




export default function Page() {
  const [data, error, pending] = useGetTasks()

  return (
    <div className="container mx-auto py-10">
      {pending ? <h2>Waiting for data</h2>
      : error ? <h1>{error as string}</h1>
      : <DataTable columns={columns} data={data as Task[]} />}
    </div>
  )
}
