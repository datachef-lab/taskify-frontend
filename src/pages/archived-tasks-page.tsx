import { useState } from "react";
import { ArchiveRestoreIcon, SearchIcon, Filter } from "lucide-react";
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

// Define the task type
interface ArchivedTask {
  id: string;
  title: string;
  dateArchived: string;
  category: string;
  status: string;
  priority: "high" | "medium" | "low";
}

// Mock data for the archived tasks
const mockArchivedTasks: ArchivedTask[] = [
  {
    id: "archived-1",
    title: "Complete user authentication flow",
    dateArchived: "2023-11-15",
    category: "Backend",
    status: "Completed",
    priority: "high",
  },
  {
    id: "archived-2",
    title: "Design dashboard layout",
    dateArchived: "2023-11-18",
    category: "UI/UX",
    status: "Completed",
    priority: "medium",
  },
  {
    id: "archived-3",
    title: "Fix API endpoints",
    dateArchived: "2023-11-20",
    category: "Backend",
    status: "Completed",
    priority: "high",
  },
  {
    id: "archived-4",
    title: "Refactor CSS for mobile responsiveness",
    dateArchived: "2023-11-22",
    category: "Frontend",
    status: "Completed",
    priority: "medium",
  },
  {
    id: "archived-5",
    title: "Update documentation",
    dateArchived: "2023-11-25",
    category: "Documentation",
    status: "Completed",
    priority: "low",
  },
  {
    id: "archived-6",
    title: "Integrate payment gateway",
    dateArchived: "2023-11-28",
    category: "Backend",
    status: "Cancelled",
    priority: "high",
  },
  {
    id: "archived-7",
    title: "Create onboarding screens",
    dateArchived: "2023-12-01",
    category: "UI/UX",
    status: "Completed",
    priority: "medium",
  },
  {
    id: "archived-8",
    title: "Write unit tests for auth module",
    dateArchived: "2023-12-04",
    category: "Testing",
    status: "Cancelled",
    priority: "medium",
  },
  {
    id: "archived-9",
    title: "Optimize database queries",
    dateArchived: "2023-12-08",
    category: "Backend",
    status: "Completed",
    priority: "high",
  },
  {
    id: "archived-10",
    title: "Add error handling to forms",
    dateArchived: "2023-12-10",
    category: "Frontend",
    status: "Completed",
    priority: "medium",
  },
];

export default function ArchivedTasksPage() {
  const [tasks, setTasks] = useState<ArchivedTask[]>(mockArchivedTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allStatuses = Array.from(
    new Set(mockArchivedTasks.map((task) => task.status))
  );
  const allCategories = Array.from(
    new Set(mockArchivedTasks.map((task) => task.category))
  );

  // Filter tasks based on search query and selected filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(task.status);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(task.category);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handle restoring a task
  const handleRestoreTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success("Task restored and moved to active tasks");
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  const statusColors = {
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Cancelled:
      "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Archived Tasks</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search archived tasks..."
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
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {allStatuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedStatuses([...selectedStatuses, status]);
                    } else {
                      setSelectedStatuses(
                        selectedStatuses.filter((s) => s !== status)
                      );
                    }
                  }}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Archived Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No archived tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        statusColors[
                          task.status as keyof typeof statusColors
                        ] || ""
                      }
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={priorityColors[task.priority]}
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.category}</TableCell>
                  <TableCell>{task.dateArchived}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRestoreTask(task.id)}
                    >
                      <ArchiveRestoreIcon className="h-4 w-4 mr-1" />
                      Restore
                    </Button>
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
