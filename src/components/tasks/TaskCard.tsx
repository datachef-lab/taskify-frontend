import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Task } from "./TaskDetailsModal";
import { format } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "p-3 bg-card rounded-md shadow-sm border cursor-pointer hover:shadow-md transition-shadow",
        isDragging ? "ring-2 ring-primary" : ""
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h4 className="font-medium line-clamp-2 text-sm">{task.title}</h4>
          {task.priority && (
            <Badge
              variant="outline"
              className={
                priorityColors[
                  task.priority.toLowerCase() as keyof typeof priorityColors
                ]
              }
            >
              {task.priority}
            </Badge>
          )}
        </div>

        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>
              {task.dueDate
                ? formatDistanceToNow(new Date(task.dueDate), {
                    addSuffix: true,
                  })
                : "No deadline"}
            </span>
          </div>

          {task.assignee && (
            <div className="flex items-center space-x-1">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
                {getInitials(task.assignee)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
