'use client'

import { columns } from "./component/columns"
import { DataTable } from "./component/data-table"
import useGetTasks from "./hook/useGetTasks"
import { useEffect } from "react"
import { useCache } from "@/components/CacheProvider"

export default function Page() {
  const {data, error, pending} = useGetTasks();
  const {data: chachedData, setData} = useCache();


  useEffect(() => {
    if (data && !pending && !error) {
      setData(data);
    }
  }, [data, pending, error, setData])

  return (
    <div className="w-full sm:w-[85%] mx-auto py-10">
      {pending || !chachedData ? <h2>Waiting for data</h2>
      : error ? <h1>{error as string}</h1>
      : <DataTable columns={columns} data={chachedData} />}
    </div>
  )
}
