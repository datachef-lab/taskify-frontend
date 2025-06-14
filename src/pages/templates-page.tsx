import React from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { mockTaskTemplatesWithRelations } from "@/lib/data/mock-templates";

export default function TemplatesPage() {
  const navigate = useNavigate();

  const handleViewTemplate = (templateId: number) => {
    navigate(`/home/templates/${templateId}`);
  };

  const handleCreateTemplate = () => {
    navigate("/home/templates/create");
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Templates</h1>
        <Button
          onClick={handleCreateTemplate}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Templates</CardTitle>
          <CardDescription>Browse all available task templates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Sr No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Tasks Created</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTaskTemplatesWithRelations.map((template, index) => (
                <TableRow
                  key={template.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewTemplate(template.id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    {new Date(template.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(template.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{Math.floor(Math.random() * 15)}</TableCell>{" "}
                  {/* Mock task count */}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewTemplate(template.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
