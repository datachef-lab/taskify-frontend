import React, { useState } from "react";
import {
  Trash2Icon,
  SearchIcon,
  Filter,
  ArchiveRestoreIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define the task type
interface TrashedTask {
  id: string;
  title: string;
  deletedDate: string;
  category: string;
  priority: "high" | "medium" | "low";
  daysUntilPermanentDeletion: number;
}

// Mock data for the trashed tasks
const mockTrashedTasks: TrashedTask[] = [
  {
    id: "trashed-1",
    title: "Update hero component on landing page",
    deletedDate: "2023-12-10",
    category: "Frontend",
    priority: "medium",
    daysUntilPermanentDeletion: 25,
  },
  {
    id: "trashed-2",
    title: "Fix user profile image upload",
    deletedDate: "2023-12-12",
    category: "Frontend",
    priority: "high",
    daysUntilPermanentDeletion: 27,
  },
  {
    id: "trashed-3",
    title: "Implement email verification flow",
    deletedDate: "2023-12-13",
    category: "Backend",
    priority: "high",
    daysUntilPermanentDeletion: 28,
  },
  {
    id: "trashed-4",
    title: "Create mobile navigation menu",
    deletedDate: "2023-12-15",
    category: "UI/UX",
    priority: "medium",
    daysUntilPermanentDeletion: 30,
  },
  {
    id: "trashed-5",
    title: "Fix pagination on search results",
    deletedDate: "2023-12-18",
    category: "Frontend",
    priority: "low",
    daysUntilPermanentDeletion: 3,
  },
  {
    id: "trashed-6",
    title: "Add unit tests for user service",
    deletedDate: "2023-12-20",
    category: "Testing",
    priority: "medium",
    daysUntilPermanentDeletion: 5,
  },
  {
    id: "trashed-7",
    title: "Update API documentation",
    deletedDate: "2023-12-22",
    category: "Documentation",
    priority: "low",
    daysUntilPermanentDeletion: 7,
  },
];

export default function TrashedTasksPage() {
  const [tasks, setTasks] = useState<TrashedTask[]>(mockTrashedTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const allCategories = Array.from(
    new Set(mockTrashedTasks.map((task) => task.category))
  );
  const allPriorities = Array.from(
    new Set(mockTrashedTasks.map((task) => task.priority))
  );

  // Filter tasks based on search query and selected filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(task.category);
    const matchesPriority =
      selectedPriorities.length === 0 ||
      selectedPriorities.includes(task.priority);
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Handle restoring a task
  const handleRestoreTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success("Task restored successfully");
  };

  // Handle permanently deleting a task
  const handlePermanentDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success("Task permanently deleted");
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Trashed Tasks</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trashed tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {allCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category)
                      );
                    }
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Priority
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {allPriorities.map((priority) => (
                <DropdownMenuCheckboxItem
                  key={priority}
                  checked={selectedPriorities.includes(priority)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedPriorities([...selectedPriorities, priority]);
                    } else {
                      setSelectedPriorities(
                        selectedPriorities.filter((p) => p !== priority)
                      );
                    }
                  }}
                >
                  {priority}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Deleted Date</TableHead>
              <TableHead>Auto-Delete In</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No trashed tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={priorityColors[task.priority]}
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.category}</TableCell>
                  <TableCell>{task.deletedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {task.daysUntilPermanentDeletion <= 7 && (
                        <AlertTriangleIcon
                          className="h-4 w-4 mr-1 text-amber-500"
                          title="This task will be permanently deleted soon"
                        />
                      )}
                      {task.daysUntilPermanentDeletion} days
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRestoreTask(task.id)}
                      >
                        <ArchiveRestoreIcon className="h-4 w-4 mr-1" />
                        Restore
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            <Trash2Icon className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Permanently Delete Task
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the task "{task.title}" from
                              the system.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handlePermanentDelete(task.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete Permanently
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
