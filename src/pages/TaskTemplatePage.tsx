import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, ArrowLeft, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { mockTaskTemplatesWithRelations } from "@/lib/data/mockTemplates";

export default function TaskTemplatePage() {
  const { taskTemplateId } = useParams();
  const navigate = useNavigate();
  const [taskTemplate, setTaskTemplate] = useState<any>(null);

  useEffect(() => {
    // Find the task template by id
    const template = mockTaskTemplatesWithRelations.find(
      (t) => t.id === Number(taskTemplateId)
    );
    if (template) {
      setTaskTemplate(template);
    } else {
      navigate("/home/templates");
    }
  }, [taskTemplateId, navigate]);

  const handleGoBack = () => {
    navigate("/home/templates");
  };

  const handleViewFunction = (fnId: number) => {
    navigate(`/home/templates/${taskTemplateId}/${fnId}`);
  };

  const handleCreateFunction = () => {
    // Navigate to function creation page
    // This would be implemented as needed
    console.log("Create function");
  };

  if (!taskTemplate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleGoBack}>Templates</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{taskTemplate.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <div>
          <Button variant="ghost" onClick={handleGoBack} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>
          <h1 className="text-3xl font-bold">{taskTemplate.name}</h1>
          <p className="text-muted-foreground">{taskTemplate.description}</p>
        </div>
        <Button
          onClick={handleCreateFunction}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Function
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Function Templates</CardTitle>
          <CardDescription>
            All function templates for {taskTemplate.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Sr No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Fields Count</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taskTemplate.fnTemplates?.map((fn: any, index: number) => (
                <TableRow
                  key={fn.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewFunction(fn.id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{fn.name}</TableCell>
                  <TableCell>{fn.type}</TableCell>
                  <TableCell>{fn.order}</TableCell>
                  <TableCell>{fn.fieldTemplates?.length || 0}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewFunction(fn.id);
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
