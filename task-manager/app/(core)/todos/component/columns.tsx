"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RowAction from "./RowAction";
import { ArrowUpDown, Filter, X } from "lucide-react";
import { StatusEnum, Task } from "@/lib/type";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Task",
    filterFn: (row, columnId, filterValue) => {
      const needle = filterValue.toLowerCase();
      const haystacks = [
        row.original.title.toLowerCase(),
        row.original.description.toLowerCase(),
        row.original.status.toLowerCase(),
      ];
      return haystacks.join(",").includes(needle);
    },
  },
  {
    accessorKey: "description",
    header: "Descreption",
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate: Date = row.getValue("dueDate");
      const formatted = new Date(dueDate).toLocaleDateString("en-US");

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8  p-0">
                <span>Status</span>
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => column.setFilterValue("Todo")}>
                Todo
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => column.setFilterValue("In Progress")}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => column.setFilterValue("Completed")}
              >
                Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {!!column.getFilterValue() && (
            <X
              className="ml-2 h-4 w-4 hover:border hover:bg-secondary"
              onClick={() => column.setFilterValue("")}
            />
          )}
        </div>
      );
    },
    cell: ({ row }) => {
      const status: StatusEnum = row.getValue("status");
      return (
        <span
          className={cn(
            "flex items-center justify-center rounded-sm border p-1 font-semibold",
            status === "Todo"
              ? "bg-blue-200/10 text-blue-500 border-blue-500/20"
              : status === "In Progress"
              ? "bg-yellow-200/10 text-yellow-500 border-yellow-500/20"
              : "bg-green-200/10 text-green-500 border-green-500/20"
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction task={row.original} />,
  },
];
