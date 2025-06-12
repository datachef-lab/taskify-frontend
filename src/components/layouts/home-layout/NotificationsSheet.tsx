import { Bell, CheckCircle2, Clock, AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock notifications data with types
const notifications = [
  {
    id: 1,
    title: "New Task Assigned",
    description: "You have been assigned a new task: 'Review Customer Feedback'",
    timestamp: "2 minutes ago",
    type: "task",
    read: false,
  },
  {
    id: 2,
    title: "Task Completed",
    description: "Task 'Update Documentation' has been marked as completed",
    timestamp: "1 hour ago",
    type: "success",
    read: false,
  },
  {
    id: 3,
    title: "System Update",
    description: "System maintenance scheduled for tomorrow at 2 AM",
    timestamp: "3 hours ago",
    type: "warning",
    read: true,
  },
  {
    id: 4,
    title: "New Comment",
    description: "John Doe commented on your task: 'Please review the latest changes'",
    timestamp: "5 hours ago",
    type: "comment",
    read: true,
  },
  {
    id: 5,
    title: "Task Deadline",
    description: "Task 'Finalize Project Report' is due in 2 days",
    timestamp: "1 day ago",
    type: "warning",
    read: false,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "task":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case "comment":
      return <MessageSquare className="h-4 w-4 text-purple-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

export function NotificationsSheet() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-muted/50 transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center animate-in fade-in zoom-in duration-200">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] p-0">
        <SheetHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-semibold">Notifications</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-1.5 p-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={cn(
                  "transition-all duration-200 hover:shadow-md",
                  !notification.read && "bg-muted/50",
                  "border-l-4",
                  notification.type === "task" && "border-l-blue-500",
                  notification.type === "success" && "border-l-green-500",
                  notification.type === "warning" && "border-l-amber-500",
                  notification.type === "comment" && "border-l-purple-500"
                )}
              >
                <CardHeader className="pb-2 px-4 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-base leading-none">{notification.title}</CardTitle>
                        <CardDescription className="text-xs">{notification.timestamp}</CardDescription>
                      </div>
                    </div>
                    {!notification.read && (
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 shrink-0">
                        New
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{notification.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
} 