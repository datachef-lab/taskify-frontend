import React, { useState, useCallback } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusIcon, GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Define the task type
interface Task {
  id: string;
  content: string;
  status: string;
  priority: "high" | "medium" | "low";
}

// Define the board column type
interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// Initial data for the kanban board
const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        content: "Design Kanban interface",
        status: "todo",
        priority: "high",
      },
      {
        id: "task-2",
        content: "Create drag and drop functionality",
        status: "todo",
        priority: "high",
      },
      {
        id: "task-3",
        content: "Implement column organization",
        status: "todo",
        priority: "medium",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-4",
        content: "Set up dnd-kit integration",
        status: "in-progress",
        priority: "high",
      },
      {
        id: "task-5",
        content: "Style the kanban board",
        status: "in-progress",
        priority: "medium",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "task-6",
        content: "Project planning",
        status: "done",
        priority: "high",
      },
      {
        id: "task-7",
        content: "Component architecture design",
        status: "done",
        priority: "medium",
      },
      {
        id: "task-8",
        content: "Theme selection",
        status: "done",
        priority: "low",
      },
    ],
  },
];

// Task Item Component
function TaskItem({
  task,
  isOverlay = false,
}: {
  task: Task;
  isOverlay?: boolean;
}) {
  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <Card className={cn("mb-2 shadow-sm", isOverlay && "shadow-md rotate-1")}>
      <CardHeader className="py-2 px-3 flex flex-row justify-between items-start">
        <div className="text-sm font-medium">{task.content}</div>
        <Badge
          className={cn("ml-2 text-[10px]", priorityColors[task.priority])}
        >
          {task.priority}
        </Badge>
      </CardHeader>
    </Card>
  );
}

// Sortable Task Component
function SortableTaskItem({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      <div
        {...listeners}
        className="absolute top-2 left-2 cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100"
      >
        <GripVertical size={14} />
      </div>
      <TaskItem task={task} />
    </div>
  );
}

// Column Component
function Column({ column }: { column: Column }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800/50 p-2 rounded-lg w-full">
      <h3 className="font-semibold mb-2 px-2 flex justify-between">
        {column.title}
        <Badge variant="outline" className="ml-2">
          {column.tasks.length}
        </Badge>
      </h3>

      <div className="min-h-32">
        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={rectSortingStrategy}
        >
          {column.tasks.map((task) => (
            <SortableTaskItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      <Button variant="ghost" size="sm" className="w-full mt-2">
        <PlusIcon size={14} className="mr-1" />
        Add task
      </Button>
    </div>
  );
}

export default function TaskboardPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Find a task in any column
  const findTask = useCallback(
    (id: string) => {
      for (const column of columns) {
        const task = column.tasks.find((task) => task.id === id);
        if (task) return { task, column };
      }
      return { task: null, column: null };
    },
    [columns]
  );

  // Handle drag start
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const { task } = findTask(active.id as string);
      setActiveTask(task);
    },
    [findTask]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      // Find the active task
      const { task: activeTask, column: activeColumn } = findTask(
        active.id as string
      );

      if (!activeTask || !activeColumn) return;

      // Move within the same column
      setColumns((prevColumns) => {
        return prevColumns.map((col) => {
          // Skip columns that don't match
          if (col.id !== activeColumn.id) return col;

          const oldIndex = col.tasks.findIndex((t) => t.id === activeTask.id);
          const newIndex = col.tasks.findIndex((t) => t.id === over.id);

          if (oldIndex === -1 || newIndex === -1) return col;

          // Return updated column with reordered tasks
          return {
            ...col,
            tasks: arrayMove(col.tasks, oldIndex, newIndex),
          };
        });
      });

      setActiveTask(null);
    },
    [findTask]
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Project Taskboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}

          <DragOverlay>
            {activeTask ? <TaskItem task={activeTask} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
