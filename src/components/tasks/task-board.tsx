import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TaskDetailsModal, Task } from "./task-details-modal";

// Define column interface
interface Column {
  id: string;
  title: string;
  color: string;
}

// Define TaskBoard props
interface TaskBoardProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskCreate: () => void;
}

export function TaskBoard({
  tasks,
  onTaskUpdate,
  onTaskCreate,
}: TaskBoardProps) {
  // Define columns
  const columns: Column[] = [
    { id: "todo", title: "To Do", color: "bg-slate-100" },
    { id: "in-progress", title: "In Progress", color: "bg-blue-50" },
    { id: "review", title: "Review", color: "bg-amber-50" },
    { id: "done", title: "Done", color: "bg-green-50" },
  ];

  // State for tasks and active task (being dragged)
  const [tasksByColumn, setTasksByColumn] = useState<Record<string, Task[]>>(
    {}
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Organize tasks by status column
  useEffect(() => {
    const grouped = tasks.reduce((acc, task) => {
      const status = task.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {} as Record<string, Task[]>);

    // Ensure all columns exist in the map
    columns.forEach((column) => {
      if (!grouped[column.id]) {
        grouped[column.id] = [];
      }
    });

    setTasksByColumn(grouped);
  }, [tasks]);

  // Handle drag start
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const taskId = active.id as string;

    // Find the task in all columns
    for (const columnId in tasksByColumn) {
      const foundTask = tasksByColumn[columnId].find((t) => t.id === taskId);
      if (foundTask) {
        setActiveTask(foundTask);
        break;
      }
    }
  }

  // Handle drag end
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const overId = over.id as string;

    // If task is dropped on a column
    if (overId.startsWith("column-")) {
      const columnId = overId.replace("column-", "");

      // Find the task's current column
      let sourceColumnId = "";
      let taskIndex = -1;

      for (const colId in tasksByColumn) {
        const index = tasksByColumn[colId].findIndex((t) => t.id === taskId);
        if (index !== -1) {
          sourceColumnId = colId;
          taskIndex = index;
          break;
        }
      }

      if (sourceColumnId && taskIndex !== -1) {
        // Only proceed if the column changed
        if (sourceColumnId !== columnId) {
          const taskToMove = {
            ...tasksByColumn[sourceColumnId][taskIndex],
            status: columnId,
          };

          // Update the task's status
          onTaskUpdate(taskToMove);

          // Update local state
          const newTasksByColumn = { ...tasksByColumn };
          newTasksByColumn[sourceColumnId] = newTasksByColumn[
            sourceColumnId
          ].filter((t) => t.id !== taskId);

          if (!newTasksByColumn[columnId]) {
            newTasksByColumn[columnId] = [];
          }

          newTasksByColumn[columnId].push(taskToMove);
          setTasksByColumn(newTasksByColumn);

          toast.success(
            `Task moved to ${columns.find((c) => c.id === columnId)?.title}`
          );
        }
      }
    }

    setActiveTask(null);
  }

  // Handle opening task details
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  // Handle task updates from modal
  const handleTaskSave = (updatedTask: Task) => {
    onTaskUpdate(updatedTask);

    // Update local state
    const newTasksByColumn = { ...tasksByColumn };

    // If status changed, move to different column
    if (selectedTask && updatedTask.status !== selectedTask.status) {
      // Remove from old column
      newTasksByColumn[selectedTask.status] = newTasksByColumn[
        selectedTask.status
      ].filter((t) => t.id !== updatedTask.id);

      // Add to new column
      if (!newTasksByColumn[updatedTask.status]) {
        newTasksByColumn[updatedTask.status] = [];
      }
      newTasksByColumn[updatedTask.status].push(updatedTask);
    } else if (selectedTask) {
      // Just update the task in its current column
      const columnId = selectedTask.status;
      const taskIndex = newTasksByColumn[columnId].findIndex(
        (t) => t.id === updatedTask.id
      );

      if (taskIndex !== -1) {
        newTasksByColumn[columnId][taskIndex] = updatedTask;
      }
    }

    setTasksByColumn(newTasksByColumn);
    setSelectedTask(updatedTask);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Task Board</h2>
        <Button onClick={onTaskCreate} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="h-[calc(100%-60px)] overflow-x-auto pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex h-full gap-4 min-w-max">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                id={`column-${column.id}`}
                title={column.title}
                color={column.color}
                tasks={tasksByColumn[column.id] || []}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      <TaskDetailsModal
        task={selectedTask}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        onSave={handleTaskSave}
      />
    </div>
  );
}
