import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "../tasks/TaskCard";
import { TaskDetailsModal, Task } from "../tasks/TaskDetailsModal";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (task: Partial<Task>) => void;
  onTaskCreate: (task: Partial<Task>) => void;
  onTaskDelete: (taskId: string) => void;
}

export function KanbanBoard({
  tasks,
  onTaskUpdate,
  onTaskCreate,
  onTaskDelete,
}: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsCreatingTask(false);
    setIsModalOpen(true);
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsCreatingTask(true);
    setIsModalOpen(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Extract task ID and target column ID
    const taskId = active.id.toString();
    const targetColumnId = over.id.toString().split("-")[0];

    // Find the task being dragged
    const task = tasks.find((t) => t.id === taskId);

    if (task && task.status !== targetColumnId) {
      // Update the task status
      onTaskUpdate({
        id: taskId,
        status: targetColumnId,
      });
    }
  };

  const getTasksInColumn = (columnId: string) => {
    return tasks.filter((task) => task.status === columnId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 p-2">
        <h2 className="text-xl font-semibold">Task Board</h2>
        <Button onClick={handleCreateTask}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full overflow-hidden">
          {columns.map((column) => (
            <div
              key={column.id}
              id={`${column.id}`}
              className="bg-muted/40 rounded-lg p-3 flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{column.title}</h3>
                <span className="text-xs bg-muted rounded-full px-2 py-1">
                  {getTasksInColumn(column.id).length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto">
                <SortableContext
                  items={getTasksInColumn(column.id).map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {getTasksInColumn(column.id).map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => handleTaskClick(task)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </div>
            </div>
          ))}
        </div>
      </DndContext>

      <TaskDetailsModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(updatedTask) => {
          if (isCreatingTask) {
            onTaskCreate(updatedTask);
          } else {
            onTaskUpdate(updatedTask);
          }
        }}
        onDelete={onTaskDelete}
        isCreating={isCreatingTask}
      />
    </div>
  );
}
