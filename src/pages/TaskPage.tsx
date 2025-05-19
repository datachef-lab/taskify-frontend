import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserCircle2, MessageCircle, Send, CheckCircle2 } from "lucide-react";

// Types for comments and replies
interface Reactions {
  [key: string]: number;
  like: number;
  love: number;
  funny: number;
}
interface Reply {
  user: string;
  text: string;
  time: string;
  reactions: Reactions;
}
interface Comment {
  user: string;
  text: string;
  time: string;
  reactions: Reactions;
  replies: Reply[];
}

// Simple Rich Text Editor placeholder
function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      contentEditable
      className="border rounded p-2 min-h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
      onInput={(e) => onChange((e.target as HTMLElement).innerText)}
      suppressContentEditableWarning
      style={{ whiteSpace: "pre-wrap" }}
    >
      {value}
    </div>
  );
}

// Helper for department badge color
const departmentColors: Record<string, string> = {
  SERVICE: "bg-blue-100 text-blue-700 border-blue-300",
  WORKSHOP: "bg-orange-100 text-orange-700 border-orange-300",
  // Add more departments as needed
};
// Helper for priority badge color
const priorityColors: Record<string, string> = {
  HIGH: "bg-red-100 text-red-700 border-red-300",
  NORMAL: "bg-yellow-100 text-yellow-700 border-yellow-300",
  LOW: "bg-green-100 text-green-700 border-green-300",
};
// Helper for avatar color
function avatarColor(name: string) {
  const colors = [
    "bg-indigo-100 text-indigo-700",
    "bg-pink-100 text-pink-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-blue-100 text-blue-700",
    "bg-orange-100 text-orange-700",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
}

export default function TaskPage() {
  // Mock data
  const functions = [
    {
      id: 1,
      name: "Follow-Up with Customer",
      department: "SERVICE",
      createdAt: "May 10th, 2025 19:22",
      dueDate: "May 10th, 2025",
      lastEdited: "May 10th, 2025 19:22",
      closedAt: "-",
      status: "Ready",
    },
    {
      id: 2,
      name: "Prepare Estimate",
      department: "SERVICE",
      createdAt: "May 10th, 2025 19:22",
      dueDate: "May 10th, 2025",
      lastEdited: "May 10th, 2025 19:21",
      closedAt: "May 10th, 2025 19:21",
      status: "",
    },
    {
      id: 3,
      name: "Create Job Card",
      department: "SERVICE",
      createdAt: "May 10th, 2025 19:21",
      dueDate: "May 10th, 2025",
      lastEdited: "May 10th, 2025 19:21",
      closedAt: "May 10th, 2025 19:21",
      status: "",
    },
    {
      id: 4,
      name: "Ready",
      department: "WORKSHOP",
      createdAt: "May 9th, 2025 13:51",
      dueDate: "May 9th, 2025",
      lastEdited: "May 9th, 2025 13:51",
      closedAt: "May 9th, 2025 13:51",
      status: "Ready",
    },
    {
      id: 5,
      name: "Painting",
      department: "WORKSHOP",
      createdAt: "May 9th, 2025 13:51",
      dueDate: "May 9th, 2025",
      lastEdited: "May 9th, 2025 13:51",
      closedAt: "-",
      status: "Ready",
    },
    // ...more rows as needed
  ];
  const [commentValue, setCommentValue] = useState("");
  const [comments] = useState<Comment[]>([
    {
      user: "Manager",
      text: "Please update all functions by EOD. @Nabin",
      time: "May 10th, 2025 11:00",
      reactions: { like: 2, love: 1, funny: 0 },
      replies: [
        {
          user: "Nabin",
          text: "Will do! 👍",
          time: "May 10th, 2025 11:05",
          reactions: { like: 1, love: 0, funny: 1 },
        },
      ],
    },
    {
      user: "Nabin",
      text: "Started the task.",
      time: "May 10th, 2025 10:00",
      reactions: { like: 0, love: 0, funny: 0 },
      replies: [],
    },
  ]);
  const task = {
    id: "S2505080",
    type: "SERVICE_TASK",
    priority: "NORMAL",
    assignee: "Nabin",
    status: "IN_PROGRESS",
    createdBy: "Workshop",
    pumpType: "BOREWELL",
    problemDescription: "",
    customer: {
      name: "EIGHTEEN WOODLAND PROPERTIES PVT LTD",
      contact: "Mr. Sharma",
      phone: "9876543210",
      address: "123 Main St, City",
    },
  };

  // Emoji reactions
  const emojiList = [
    { key: "like", label: "👍" },
    { key: "love", label: "❤️" },
    { key: "funny", label: "😂" },
  ];

  return (
    <div className="w-full h-[calc(100vh-60px)] flex bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Left: Functions + Comments */}
      <div className="flex flex-col border-r w-[72%] min-w-[400px] h-full bg-white/80">
        {/* Functions List */}
        <div className="border-b p-4 h-[40%] min-h-[200px] overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-xl text-indigo-700 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Functions
            </h2>
            <Button
              size="sm"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Add
            </Button>
          </div>
          <div className="rounded-xl shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-indigo-50">
                  <TableHead>Sr. No.</TableHead>
                  <TableHead>Function</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Last Edited</TableHead>
                  <TableHead>Closed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {functions.map((fn, idx) => (
                  <TableRow
                    key={fn.id}
                    className={`even:bg-gray-50 hover:bg-indigo-50 transition ${
                      fn.status === "Ready" ? "bg-green-50" : ""
                    }`}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-semibold flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${avatarColor(
                          fn.name
                        )}`}
                      >
                        {fn.name[0]}
                      </span>
                      {fn.name}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full border text-xs font-semibold ${
                          departmentColors[fn.department] ||
                          "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        {fn.department}
                      </span>
                    </TableCell>
                    <TableCell>{fn.createdAt}</TableCell>
                    <TableCell>{fn.dueDate}</TableCell>
                    <TableCell>{fn.lastEdited}</TableCell>
                    <TableCell>{fn.closedAt || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* Comments Section - Jira Style */}
        <div className="flex-1 p-4 overflow-auto flex flex-col bg-white/90 rounded-b-xl shadow-inner">
          <h2 className="font-bold text-xl text-indigo-700 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" /> Comments
          </h2>
          <div className="flex-1 overflow-auto space-y-6 mb-4">
            {comments.map((c, i) => {
              return (
                <div key={i} className="group flex items-start gap-3">
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base ${avatarColor(
                      c.user
                    )}`}
                  >
                    {c.user[0]}
                  </div>
                  {/* Comment Card */}
                  <div className="flex-1">
                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm group-hover:shadow-md transition relative">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-indigo-700">
                            {c.user}
                          </span>
                          <span className="text-xs text-gray-400">
                            {c.time}
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition">
                          <button className="text-xs text-gray-500 hover:text-indigo-600">
                            Edit
                          </button>
                          <button className="text-xs text-gray-500 hover:text-red-600">
                            Delete
                          </button>
                          <button className="text-xs text-gray-500 hover:text-blue-600">
                            Reply
                          </button>
                        </div>
                      </div>
                      <div className="text-gray-800 mb-2 whitespace-pre-line">
                        {c.text}
                      </div>
                      {/* Emoji reactions */}
                      <div className="flex gap-2 items-center mt-2">
                        {emojiList.map((emoji) => (
                          <span
                            key={emoji.key}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                              c.reactions[emoji.key] > 0
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : "bg-gray-50 text-gray-500 border-gray-200"
                            }`}
                          >
                            {emoji.label}
                            {c.reactions[emoji.key] > 0 && (
                              <span className="ml-0.5 text-xs font-semibold">
                                {c.reactions[emoji.key]}
                              </span>
                            )}
                          </span>
                        ))}
                        <button className="ml-2 text-xs text-gray-400 hover:text-indigo-600">
                          + Add reaction
                        </button>
                      </div>
                    </div>
                    {/* Replies */}
                    {c.replies && c.replies.length > 0 && (
                      <div className="pl-8 mt-3 space-y-3">
                        {c.replies.map((r, j) => {
                          return (
                            <div
                              key={j}
                              className="group flex items-start gap-2"
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${avatarColor(
                                  r.user
                                )}`}
                              >
                                {r.user[0]}
                              </div>
                              <div className="flex-1">
                                <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 shadow-sm group-hover:shadow transition relative">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-indigo-700">
                                        {r.user}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {r.time}
                                      </span>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition">
                                      <button className="text-xs text-gray-500 hover:text-indigo-600">
                                        Edit
                                      </button>
                                      <button className="text-xs text-gray-500 hover:text-red-600">
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                  <div className="text-gray-800 mb-2 whitespace-pre-line">
                                    {r.text}
                                  </div>
                                  <div className="flex gap-2 items-center mt-1">
                                    {emojiList.map((emoji) => (
                                      <span
                                        key={emoji.key}
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                                          r.reactions[emoji.key] > 0
                                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                            : "bg-gray-50 text-gray-500 border-gray-200"
                                        }`}
                                      >
                                        {emoji.label}
                                        {r.reactions[emoji.key] > 0 && (
                                          <span className="ml-0.5 text-xs font-semibold">
                                            {r.reactions[emoji.key]}
                                          </span>
                                        )}
                                      </span>
                                    ))}
                                    <button className="ml-2 text-xs text-gray-400 hover:text-indigo-600">
                                      + Add reaction
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Main comment input */}
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow flex items-center gap-3 mt-2">
            <UserCircle2 className="w-8 h-8 text-indigo-400" />
            <div className="flex-1">
              <RichTextEditor value={commentValue} onChange={setCommentValue} />
            </div>
            <Button className="ml-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 flex gap-1 items-center rounded-full shadow">
              <Send className="w-4 h-4" /> Add Comment
            </Button>
          </div>
        </div>
      </div>
      {/* Right: Task Details + Customer Details */}
      <div className="flex flex-col w-[28%] min-w-[260px] p-4 gap-4">
        <div className="border-l-4 border-indigo-400 p-4 mb-4 bg-white rounded-xl shadow">
          <h2 className="font-bold text-lg mb-2 text-indigo-700 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> TASK #{task.id}
          </h2>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Type:</span> {task.type}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Priority:</span>
            <span
              className={`px-2 py-1 rounded-full border text-xs font-semibold ${
                priorityColors[task.priority] ||
                "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {task.priority}
            </span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Assignee:</span>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${avatarColor(
                task.assignee
              )}`}
            >
              {task.assignee[0]}
            </span>
            {task.assignee}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span className="bg-yellow-200 px-2 py-1 rounded text-xs">
              {task.status}
            </span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Created By:</span> {task.createdBy}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Pump Type:</span> {task.pumpType}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold">Problem Description:</span>{" "}
            {task.problemDescription}
          </div>
          <div className="flex gap-2 mb-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-indigo-100"
              title="Edit Task"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l11-11a2.828 2.828 0 0 0-4-4L5 17v4z" />
              </svg>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-red-100"
              title="Delete Task"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
              </svg>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-yellow-100"
              title="Archive Task"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect x="3" y="3" width="18" height="4" rx="2" />
                <path d="M3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                <polyline points="16 10 12 14 8 10" />
              </svg>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-gray-100"
              title="Trash Task"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="border p-4 bg-white rounded-xl shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-indigo-700">Customer Info</h2>
            <Button
              size="sm"
              variant="outline"
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
            >
              Edit
            </Button>
          </div>
          <div>
            <b>Name:</b> {task.customer.name}
          </div>
          <div>
            <b>Contact:</b>{" "}
            <span
              className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs mr-1 ${avatarColor(
                task.customer.contact
              )}`}
            >
              {task.customer.contact[0]}
            </span>
            {task.customer.contact}
          </div>
          <div>
            <b>Phone:</b> {task.customer.phone}
          </div>
          <div>
            <b>Address:</b> {task.customer.address}
          </div>
        </div>
      </div>
    </div>
  );
}
