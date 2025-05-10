import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Task } from "./TaskDetailsModal";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { TaskDetailsModal } from "./TaskDetailsModal";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskChange: (updatedTask: Task) => void;
  onTaskCreate: (newTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export function KanbanBoard({
  tasks,
  onTaskChange,
  onTaskCreate,
  onTaskDelete,
}: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "To Do", tasks: [] },
    { id: "in-progress", title: "In Progress", tasks: [] },
    { id: "review", title: "Review", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  // Initialize columns with tasks
  React.useEffect(() => {
    const newColumns = [...columns];

    // Clear tasks from all columns
    newColumns.forEach((column) => {
      column.tasks = [];
    });

    // Distribute tasks to columns based on status
    tasks.forEach((task) => {
      const column = newColumns.find((col) => col.id === task.status);
      if (column) {
        column.tasks.push(task);
      } else {
        // If status doesn't match any column, default to 'todo'
        newColumns[0].tasks.push(task);
      }
    });

    setColumns(newColumns);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;

    // Find the task that is being dragged
    const draggedTask = tasks.find((task) => task.id === taskId);
    if (draggedTask) {
      setActiveTask(draggedTask);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeTaskId = active.id as string;
    const overContainerId = over.id as string;

    // If the task is dropped over a column
    if (columns.some((col) => col.id === overContainerId)) {
      // Find the task and update its status
      const taskToUpdate = tasks.find((task) => task.id === activeTaskId);

      if (taskToUpdate && taskToUpdate.status !== overContainerId) {
        const updatedTask = {
          ...taskToUpdate,
          status: overContainerId as "todo" | "in-progress" | "review" | "done",
          updatedAt: new Date().toISOString(),
        };

        onTaskChange(updatedTask);
      }
    }

    setActiveTask(null);
  };

  const handleOpenTaskModal = (task?: Task) => {
    setCurrentTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskSave = (task: Task) => {
    if (task.id && tasks.some((t) => t.id === task.id)) {
      onTaskChange(task);
    } else {
      onTaskCreate(task);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <Button onClick={() => handleOpenTaskModal()} variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-4 gap-4 h-full overflow-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
              onTaskClick={handleOpenTaskModal}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <TaskDetailsModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={currentTask}
        onSave={handleTaskSave}
        onDelete={onTaskDelete}
      />
    </div>
  );
}
