import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./task-card";
import { Task } from "./task-details-modal";

interface TaskColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskColumn({
  id,
  title,
  color,
  tasks,
  onTaskClick,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col h-full border rounded-lg overflow-hidden ${
        isOver ? "ring-2 ring-primary" : ""
      }`}
    >
      <div
        className={`p-3 ${color} text-white font-medium flex items-center justify-between`}
      >
        <h3>{title}</h3>
        <span className="text-sm bg-white/20 px-2 py-0.5 rounded">
          {tasks.length}
        </span>
      </div>
      <div className="flex-grow overflow-y-auto p-2 bg-gray-50 dark:bg-gray-800">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm italic">
            No tasks yet
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
