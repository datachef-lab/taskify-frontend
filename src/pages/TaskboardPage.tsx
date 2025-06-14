import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock task data for the table
const mockTasks = [
  {
    id: "S2505080",
    customer: "EIGHTEEN WOODLAND PROPERTIES PVT LTD",
    jobNumber: "123/O",
    latestDepartmentName: "SERVICE",
    latestFunctionName: "Follow-Up with Customer",
    priority: "NORMAL",
    lastEdited: "May 10th, 2025 19:22",
    status: "todo",
    assignee: "me",
  },
  {
    id: "S2505040",
    customer: "ALIPORE SIDDHARTHA RESIDENT 'S' WELFARE ASSOCIATION",
    jobNumber: "121/O",
    latestDepartmentName: "SERVICE",
    latestFunctionName: "Follow-Up with Customer",
    priority: "NORMAL",
    lastEdited: "May 10th, 2025 18:50",
    status: "todo",
    assignee: "me",
  },
  {
    id: "S2504019",
    customer: "ARCH GALAXY RESIDENTIAL FLAT OWNERS ASS",
    jobNumber: "014/O",
    latestDepartmentName: "DISPATCH",
    latestFunctionName: "Invoicing",
    priority: "NORMAL",
    lastEdited: "May 9th, 2025 19:13",
    status: "done",
    assignee: "other",
  },
];

function PriorityBadge({ priority }: { priority: string }) {
  const color =
    priority === "HIGH"
      ? "bg-red-100 text-red-700"
      : priority === "MEDIUM"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {priority}
    </span>
  );
}

export default function TaskboardPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.id.toLowerCase().includes(search.toLowerCase()) ||
      task.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Taskboard</h1>
      <Card className="mb-6 p-4 flex flex-col md:flex-row gap-4 items-center justify-between w-full shadow-lg rounded-xl">
        <Input
          aria-label="Search by Task ID or Customer"
          placeholder="Search by Task ID or Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setStatusFilter("all");
          }}
        >
          Reset
        </Button>
      </Card>
      <div className="mb-2 flex flex-col md:flex-row items-center justify-between gap-2">
        <span className="text-sm text-gray-500">
          Showing {filteredTasks.length} task
          {filteredTasks.length !== 1 ? "s" : ""}
        </span>
        <div className="border-t w-full md:ml-4" />
      </div>
      <Card className="overflow-x-auto w-full p-0 shadow-lg rounded-xl">
        <Table className="w-full">
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead>Sr. No.</TableHead>
              <TableHead>Task Id</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Job Number</TableHead>
              <TableHead>Latest Department Name</TableHead>
              <TableHead>Latest Function Name</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Last Edited</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-gray-500"
                >
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task, idx) => (
                <TableRow
                  key={task.id}
                  className={
                    (idx % 2 === 0 ? "bg-gray-50" : "") +
                    " hover:bg-blue-50 transition"
                  }
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <a
                      href={`#task-${task.id}`}
                      className="font-mono text-blue-700 underline underline-offset-2 hover:text-blue-900"
                    >
                      {task.id}
                    </a>
                  </TableCell>
                  <TableCell>
                    <span
                      title={task.customer}
                      className="block truncate max-w-xs"
                    >
                      {task.customer}
                    </span>
                  </TableCell>
                  <TableCell>{task.jobNumber}</TableCell>
                  <TableCell>{task.latestDepartmentName}</TableCell>
                  <TableCell>{task.latestFunctionName}</TableCell>
                  <TableCell>
                    <PriorityBadge priority={task.priority} />
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {task.lastEdited}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
