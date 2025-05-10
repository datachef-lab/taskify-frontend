import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Plus, Save, X } from "lucide-react";
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
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputType,
  ConditionType,
  ConditionalActionType,
  FnTemplateType,
} from "@/lib/types/enums";
import {
  TaskTemplateWithRelations,
  FnTemplateWithRelations,
  FieldTemplateWithInputs,
  InputTemplateWithRelations,
  ConditionalAction,
} from "@/lib/types/task";
import { DropdownOptionList } from "../components/templates/DropdownOptionList";
import { CheckboxOptionList } from "../components/templates/CheckboxOptionList";

// Extended interface to add type-specific properties that aren't in the base InputTemplate
interface ExtendedInputTemplate extends InputTemplateWithRelations {
  // General validation fields
  validationRules?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    dateFormat?: string;
    currencyFormat?: string;
    columns?: unknown[];
    toolbarConfig?: unknown;
    displayAs?: string;
    multiSelect?: boolean;
  };

  // Number / Amount fields
  min?: number;
  max?: number;

  // Date fields
  minDate?: string;
  maxDate?: string;

  // Dropdown fields
  defaultSelected?: string;

  // File fields
  allowedExtensions?: string;
  maxSize?: number;
}

// Temporary mock data to use instead of imported mockTemplates
const mockTaskTemplatesWithRelations: TaskTemplateWithRelations[] = [
  {
    id: 1,
    name: "Task Template 1",
    description: "A sample task template",
    createdAt: new Date(),
    updatedAt: new Date(),
    fnTemplates: [
      {
        id: 1,
        name: "Function Template 1",
        description: "A sample function template",
        type: FnTemplateType.NORMAL,
        order: 1,
        taskTemplateId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        fieldTemplates: [
          {
            id: 1,
            name: "Field Template 1",
            description: "A sample field template",
            order: 1,
            fnTemplateId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            inputTemplates: [
              {
                id: 1,
                name: "Input 1",
                description: "Text input",
                type: InputType.TEXT,
                order: 1,
                isRequired: true,
                defaultValue: "",
                fieldTemplateId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                dropdownTemplates: [],
                checkboxTemplates: [],
                conditionalAction: null,
              },
              {
                id: 2,
                name: "Input 2",
                description: "Number input",
                type: InputType.NUMBER,
                order: 2,
                isRequired: false,
                defaultValue: "0",
                fieldTemplateId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                dropdownTemplates: [],
                checkboxTemplates: [],
                conditionalAction: null,
              },
            ],
          },
        ],
        // Add required properties to match FnTemplateWithRelations interface
        dropdownTemplates: [],
        nextFollowUps: [],
      },
    ],
    metadataTemplates: [],
  },
];

export default function FieldTemplatePage() {
  const { taskTemplateId, fnTemplateId, fieldId, fieldTemplateId } =
    useParams();
  const navigate = useNavigate();
  const [taskTemplate, setTaskTemplate] =
    useState<TaskTemplateWithRelations | null>(null);
  const [functionTemplate, setFunctionTemplate] =
    useState<FnTemplateWithRelations | null>(null);
  const [fieldTemplate, setFieldTemplate] =
    useState<FieldTemplateWithInputs | null>(null);

  const [editingInputId, setEditingInputId] = useState<number | null>(null);
  const [editedInput, setEditedInput] = useState<ExtendedInputTemplate | null>(
    null
  );

  // State for managing dropdown and checkbox item selections for conditional actions
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<
    string | null
  >(null);
  const [selectedCheckboxId, setSelectedCheckboxId] = useState<string | null>(
    null
  );

  // Computed values for currently selected items
  const currentDropdownItem =
    editedInput?.dropdownTemplates[0]?.dropdownItems.find(
      (item) => item.id.toString() === selectedDropdownItem
    );

  const currentCheckbox = editedInput?.checkboxTemplates.find(
    (item) => item.id.toString() === selectedCheckboxId
  );

  useEffect(() => {
    // Use fieldTemplateId as fallback for fieldId
    const actualFieldId = fieldId || fieldTemplateId;

    // Find the task template and function template
    const template = mockTaskTemplatesWithRelations.find(
      (t: TaskTemplateWithRelations) => t.id === Number(taskTemplateId)
    );

    if (template) {
      setTaskTemplate(template);

      const fnTemplate = template.fnTemplates.find(
        (fn: FnTemplateWithRelations) => fn.id === Number(fnTemplateId)
      );

      if (fnTemplate) {
        setFunctionTemplate(fnTemplate);

        // Find the field template
        const field = fnTemplate.fieldTemplates.find(
          (f: FieldTemplateWithInputs) => f.id === Number(actualFieldId)
        );

        if (field) {
          setFieldTemplate(field);
        } else {
          navigate(`/home/templates/${taskTemplateId}/${fnTemplateId}`);
        }
      } else {
        navigate(`/home/templates/${taskTemplateId}`);
      }
    } else {
      navigate("/home/templates");
    }
  }, [taskTemplateId, fnTemplateId, fieldId, fieldTemplateId, navigate]);

  const handleGoBack = () => {
    navigate(`/home/templates/${taskTemplateId}/${fnTemplateId}`);
  };

  const handleCreateInput = () => {
    // Navigate to input creation page or show modal
    // For now this is a placeholder
    console.log("Create input");
  };

  const handleEditInput = (input: InputTemplateWithRelations) => {
    setEditingInputId(input.id);
    setEditedInput({
      ...input,
      min: (input as ExtendedInputTemplate).min,
      max: (input as ExtendedInputTemplate).max,
      minDate: (input as ExtendedInputTemplate).minDate,
      maxDate: (input as ExtendedInputTemplate).maxDate,
      defaultSelected: (input as ExtendedInputTemplate).defaultSelected,
      allowedExtensions: (input as ExtendedInputTemplate).allowedExtensions,
      maxSize: (input as ExtendedInputTemplate).maxSize,
      validationRules: (input as ExtendedInputTemplate).validationRules || {},
    });
  };

  const handleCancelEdit = () => {
    setEditingInputId(null);
    setEditedInput(null);
  };

  const handleSaveInput = () => {
    if (!editedInput || !fieldTemplate) return;

    // In a real application, this would call an API to update the input template
    // For this demo, we'll update it in the local state
    const updatedInputTemplates = fieldTemplate.inputTemplates.map((input) =>
      input.id === editedInput.id ? editedInput : input
    );

    const updatedField = {
      ...fieldTemplate,
      inputTemplates: updatedInputTemplates,
    };

    // Update the field template
    setFieldTemplate(updatedField);

    // Exit edit mode
    setEditingInputId(null);
    setEditedInput(null);
  };

  const handleInputChange = (property: string, value: unknown) => {
    if (!editedInput) return;
    setEditedInput({
      ...editedInput,
      [property]: value,
    });
  };

  const handleTypeChange = (value: string) => {
    if (!editedInput) return;

    // Convert string to InputType enum
    const newType = value as InputType;

    // Reset type-specific properties when changing types
    setEditedInput({
      ...editedInput,
      type: newType,
      min: undefined,
      max: undefined,
      minDate: undefined,
      maxDate: undefined,
      defaultSelected: undefined,
      allowedExtensions: undefined,
      maxSize: undefined,
      // Keep the validation rules that apply to all types
      validationRules: {
        ...(editedInput.validationRules || {}),
        // Reset type-specific validation rules
        minLength: undefined,
        maxLength: undefined,
        pattern: undefined,
        dateFormat: undefined,
        currencyFormat: undefined,
        columns: undefined,
        toolbarConfig: undefined,
        displayAs: undefined,
        multiSelect: undefined,
      },
    });
  };

  // Function to add a conditional action to an input
  const handleAddConditionalAction = () => {
    if (!editedInput) return;

    // Create a default conditional action
    const newAction: ConditionalAction = {
      id: Math.floor(Math.random() * 10000), // Temporary ID for UI purposes
      conditionType: ConditionType.EQUALS,
      conditionValue: "",
      actionType: ConditionalActionType.MARK_FIELD_AS_DONE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Update the edited input with the new conditional action
    setEditedInput({
      ...editedInput,
      conditionalAction: newAction,
    });
  };

  const handleUpdateConditionalAction = (
    field: keyof ConditionalAction,
    value: string
  ) => {
    if (!editedInput || !editedInput.conditionalAction) return;

    setEditedInput({
      ...editedInput,
      conditionalAction: {
        ...editedInput.conditionalAction,
        [field]: value,
      },
    });
  };

  const handleRemoveConditionalAction = () => {
    if (!editedInput) return;

    setEditedInput({
      ...editedInput,
      conditionalAction: null,
    });
  };

  if (!taskTemplate || !functionTemplate || !fieldTemplate) {
    return <div>Loading...</div>;
  }

  // Function to display conditional action info
  const renderConditionalAction = (action: ConditionalAction | null) => {
    if (!action)
      return (
        <p className="text-sm text-muted-foreground">No actions configured</p>
      );

    // Function to render the action type with appropriate description
    const renderActionType = (
      actionType: ConditionalActionType,
      actionValue?: string
    ) => {
      switch (actionType) {
        case ConditionalActionType.MARK_TASK_AS_DONE:
          return <span>Mark task as complete</span>;
        case ConditionalActionType.MARK_FN_AS_DONE:
          return <span>Mark function as complete</span>;
        case ConditionalActionType.MARK_FIELD_AS_DONE:
          return <span>Mark field as complete</span>;
        case ConditionalActionType.NOTIFY_USERS:
          return (
            <span>Notify users {actionValue && `(IDs: ${actionValue})`}</span>
          );
        case ConditionalActionType.ADD_DYNAMIC_INPUT:
          return (
            <span>
              Add dynamic input {actionValue && `(ID: ${actionValue})`}
            </span>
          );
        default:
          return <span>{actionType}</span>;
      }
    };

    // Function to render the condition type with a human-readable format
    const renderConditionType = (
      conditionType: ConditionType,
      conditionValue: string
    ) => {
      switch (conditionType) {
        case ConditionType.EQUALS:
          return (
            <span>
              equals <strong>{conditionValue}</strong>
            </span>
          );
        case ConditionType.GREATER_THAN:
          return (
            <span>
              is greater than <strong>{conditionValue}</strong>
            </span>
          );
        case ConditionType.GREATER_THAN_EQUALS:
          return (
            <span>
              is greater than or equal to <strong>{conditionValue}</strong>
            </span>
          );
        case ConditionType.LESS_THAN:
          return (
            <span>
              is less than <strong>{conditionValue}</strong>
            </span>
          );
        case ConditionType.LESS_THAN_EQUALS:
          return (
            <span>
              is less than or equal to <strong>{conditionValue}</strong>
            </span>
          );
        default:
          return (
            <span>
              {conditionType} <strong>{conditionValue}</strong>
            </span>
          );
      }
    };

    return (
      <div className="border rounded-md p-3 space-y-2 bg-muted/30">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Action:</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal">
              {renderActionType(action.actionType, action.actionValue)}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Triggers when value:</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              {renderConditionType(action.conditionType, action.conditionValue)}
            </Badge>
          </div>
        </div>
      </div>
    );
  };

  // Function to render input edit form based on input type
  const renderInputEditForm = (input: ExtendedInputTemplate) => {
    const commonFields = (
      <>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label
              htmlFor="input-name"
              className="text-blue-700 dark:text-blue-300"
            >
              Name
            </Label>
            <Input
              id="input-name"
              value={input.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
            />
          </div>
          <div>
            <Label
              htmlFor="input-type"
              className="text-blue-700 dark:text-blue-300"
            >
              Type
            </Label>
            <Select value={input.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="border-blue-200 dark:border-blue-800">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={InputType.TEXT}>Text</SelectItem>
                <SelectItem value={InputType.TEXTAREA}>Textarea</SelectItem>
                <SelectItem value={InputType.NUMBER}>Number</SelectItem>
                <SelectItem value={InputType.EMAIL}>Email</SelectItem>
                <SelectItem value={InputType.PHONE}>Phone</SelectItem>
                <SelectItem value={InputType.DROPDOWN}>Dropdown</SelectItem>
                <SelectItem value={InputType.AMOUNT}>Amount</SelectItem>
                <SelectItem value={InputType.CHECKBOX}>Checkbox</SelectItem>
                <SelectItem value={InputType.DATE}>Date</SelectItem>
                <SelectItem value={InputType.BOOLEAN}>Boolean</SelectItem>
                <SelectItem value={InputType.FILE}>File</SelectItem>
                <SelectItem value={InputType.MULTIPLE_FILES}>
                  Multiple Files
                </SelectItem>
                <SelectItem value={InputType.RICH_TEXT_EDITOR}>
                  Rich Text Editor
                </SelectItem>
                <SelectItem value={InputType.TABLE}>Table</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label
              htmlFor="input-description"
              className="text-blue-700 dark:text-blue-300"
            >
              Description
            </Label>
            <Textarea
              id="input-description"
              value={input.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
            />
          </div>
          <div>
            <Label
              htmlFor="input-required"
              className="block mb-2 text-blue-700 dark:text-blue-300"
            >
              Required
            </Label>
            <div className="flex items-center">
              <Switch
                id="input-required"
                checked={input.isRequired}
                onCheckedChange={(checked) =>
                  handleInputChange("isRequired", checked)
                }
                className="data-[state=checked]:bg-blue-600"
              />
              <span className="ml-2 text-blue-700 dark:text-blue-300">
                {input.isRequired ? "Yes" : "No"}
              </span>
            </div>
            <div className="mt-4">
              <Label
                htmlFor="input-order"
                className="text-blue-700 dark:text-blue-300"
              >
                Order
              </Label>
              <Input
                id="input-order"
                type="number"
                value={input.order.toString()}
                onChange={(e) =>
                  handleInputChange("order", parseInt(e.target.value) || 1)
                }
                className="border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </>
    );

    // Type-specific fields
    let typeSpecificFields = null;

    // Updated dropdown item render with conditional action at the item level
    if (input.type === InputType.DROPDOWN) {
      typeSpecificFields = (
        <div className="space-y-2">
          <Label className="text-blue-700 dark:text-blue-300">
            Dropdown Options
          </Label>
          {input.dropdownTemplates.length > 0 ? (
            <div>
              <DropdownOptionList
                options={
                  input.dropdownTemplates[0]?.dropdownItems.map((item) => ({
                    id: item.id.toString(),
                    name: item.name,
                    order: item.order,
                  })) || []
                }
                onAddOption={(option: { name: string; order: number }) => {
                  // Check if option with the same name already exists
                  const existingOption =
                    input.dropdownTemplates[0]?.dropdownItems.find(
                      (item) =>
                        item.name.toLowerCase() === option.name.toLowerCase()
                    );

                  if (existingOption) {
                    // Option already exists, show a notification or alert the user
                    alert(`Option "${option.name}" already exists.`);
                    return;
                  }

                  // Create a new option with a random ID
                  const newOption = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: option.name,
                    order: option.order,
                  };

                  // If there's a dropdown template, add to it. Otherwise create one.
                  if (input.dropdownTemplates.length > 0) {
                    const updatedDropdownTemplate = {
                      ...input.dropdownTemplates[0],
                      dropdownItems: [
                        ...input.dropdownTemplates[0].dropdownItems,
                        newOption,
                      ],
                    };

                    handleInputChange("dropdownTemplates", [
                      updatedDropdownTemplate,
                    ]);
                  } else {
                    // Create a new dropdown template
                    const newDropdownTemplate = {
                      id: Math.random().toString(36).substring(2, 9),
                      name: input.name + " Options",
                      dropdownItems: [newOption],
                      inputTemplateId: input.id,
                    };

                    handleInputChange("dropdownTemplates", [
                      newDropdownTemplate,
                    ]);
                  }
                }}
                onUpdateOption={(
                  optionId: string,
                  updatedOption: {
                    name?: string;
                    order?: number;
                  }
                ) => {
                  if (input.dropdownTemplates.length > 0) {
                    const updatedItems =
                      input.dropdownTemplates[0].dropdownItems.map((item) =>
                        item.id.toString() === optionId
                          ? {
                              ...item,
                              name: updatedOption.name || item.name,
                              order: updatedOption.order || item.order,
                            }
                          : item
                      );

                    const updatedTemplate = {
                      ...input.dropdownTemplates[0],
                      dropdownItems: updatedItems,
                    };

                    handleInputChange("dropdownTemplates", [updatedTemplate]);
                  }
                }}
                onDeleteOption={(optionId: string) => {
                  if (input.dropdownTemplates.length > 0) {
                    const updatedItems =
                      input.dropdownTemplates[0].dropdownItems.filter(
                        (item) => item.id.toString() !== optionId
                      );

                    const updatedTemplate = {
                      ...input.dropdownTemplates[0],
                      dropdownItems: updatedItems,
                    };

                    handleInputChange("dropdownTemplates", [updatedTemplate]);
                  }
                }}
              />

              {input.dropdownTemplates[0]?.dropdownItems.length > 0 && (
                <div className="mt-6 pt-2 border-t">
                  <h4 className="text-sm font-medium mb-3">Option Actions</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <Select
                      value={
                        selectedDropdownItem?.toString() ||
                        input.dropdownTemplates[0].dropdownItems[0].id.toString()
                      }
                      onValueChange={(value) => setSelectedDropdownItem(value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {input.dropdownTemplates[0].dropdownItems.map(
                          (item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    {currentDropdownItem?.conditionalAction ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Remove conditional action from this dropdown item
                          if (!selectedDropdownItem) return;

                          const updatedItems =
                            input.dropdownTemplates[0].dropdownItems.map((i) =>
                              i.id.toString() === selectedDropdownItem
                                ? { ...i, conditionalAction: null }
                                : i
                            );

                          handleInputChange("dropdownTemplates", [
                            {
                              ...input.dropdownTemplates[0],
                              dropdownItems: updatedItems,
                            },
                          ]);
                        }}
                        className="h-9"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove Action
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Add a default conditional action to this dropdown item
                          if (!selectedDropdownItem || !currentDropdownItem)
                            return;

                          const newAction: ConditionalAction = {
                            id: Math.floor(Math.random() * 10000),
                            conditionType: ConditionType.EQUALS,
                            conditionValue: currentDropdownItem.name,
                            actionType:
                              ConditionalActionType.MARK_FIELD_AS_DONE,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                          };

                          const updatedItems =
                            input.dropdownTemplates[0].dropdownItems.map((i) =>
                              i.id.toString() === selectedDropdownItem
                                ? { ...i, conditionalAction: newAction }
                                : i
                            );

                          handleInputChange("dropdownTemplates", [
                            {
                              ...input.dropdownTemplates[0],
                              dropdownItems: updatedItems,
                            },
                          ]);
                        }}
                        className="h-9"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Action
                      </Button>
                    )}
                  </div>

                  {currentDropdownItem?.conditionalAction && (
                    <Card className="border-blue-100 dark:border-blue-900">
                      <CardContent className="p-3 space-y-3">
                        <p className="text-sm">
                          When option{" "}
                          <span className="font-semibold">
                            {currentDropdownItem.name}
                          </span>{" "}
                          is selected:
                        </p>

                        <div className="space-y-2">
                          <Label className="text-xs">Action</Label>
                          <Select
                            value={
                              currentDropdownItem.conditionalAction.actionType
                            }
                            onValueChange={(value) => {
                              if (!selectedDropdownItem) return;

                              const updatedItems =
                                input.dropdownTemplates[0].dropdownItems.map(
                                  (i) =>
                                    i.id.toString() === selectedDropdownItem
                                      ? {
                                          ...i,
                                          conditionalAction: {
                                            ...i.conditionalAction!,
                                            actionType: value,
                                          },
                                        }
                                      : i
                                );

                              handleInputChange("dropdownTemplates", [
                                {
                                  ...input.dropdownTemplates[0],
                                  dropdownItems: updatedItems,
                                },
                              ]);
                            }}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value={ConditionalActionType.MARK_TASK_AS_DONE}
                              >
                                Mark Task as Done
                              </SelectItem>
                              <SelectItem
                                value={ConditionalActionType.MARK_FN_AS_DONE}
                              >
                                Mark Function as Done
                              </SelectItem>
                              <SelectItem
                                value={ConditionalActionType.MARK_FIELD_AS_DONE}
                              >
                                Mark Field as Done
                              </SelectItem>
                              <SelectItem
                                value={ConditionalActionType.NOTIFY_USERS}
                              >
                                Notify Users
                              </SelectItem>
                              <SelectItem
                                value={ConditionalActionType.ADD_DYNAMIC_INPUT}
                              >
                                Add Dynamic Input
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {(currentDropdownItem.conditionalAction.actionType ===
                          ConditionalActionType.NOTIFY_USERS ||
                          currentDropdownItem.conditionalAction.actionType ===
                            ConditionalActionType.ADD_DYNAMIC_INPUT) && (
                          <div className="space-y-2">
                            <Label className="text-xs">
                              {currentDropdownItem.conditionalAction
                                .actionType ===
                              ConditionalActionType.NOTIFY_USERS
                                ? "User IDs (comma separated)"
                                : "Input Template ID"}
                            </Label>
                            <Input
                              value={
                                currentDropdownItem.conditionalAction
                                  .actionValue || ""
                              }
                              onChange={(e) => {
                                if (!selectedDropdownItem) return;

                                const updatedItems =
                                  input.dropdownTemplates[0].dropdownItems.map(
                                    (i) =>
                                      i.id.toString() === selectedDropdownItem
                                        ? {
                                            ...i,
                                            conditionalAction: {
                                              ...i.conditionalAction!,
                                              actionValue: e.target.value,
                                            },
                                          }
                                        : i
                                  );

                                handleInputChange("dropdownTemplates", [
                                  {
                                    ...input.dropdownTemplates[0],
                                    dropdownItems: updatedItems,
                                  },
                                ]);
                              }}
                              className="h-8"
                              placeholder={
                                currentDropdownItem.conditionalAction
                                  .actionType ===
                                ConditionalActionType.NOTIFY_USERS
                                  ? "e.g. 1,2,3"
                                  : "e.g. 123"
                              }
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-base text-blue-800 dark:text-blue-200">
                  No Options
                </CardTitle>
                <CardDescription>
                  This dropdown doesn't have any options yet. You need to add
                  options for users to select from.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    // Create first dropdown template with an empty items array
                    const newDropdownTemplate = {
                      id: Math.random().toString(36).substring(2, 9),
                      name: input.name + " Options",
                      dropdownItems: [],
                      inputTemplateId: input.id,
                    };

                    handleInputChange("dropdownTemplates", [
                      newDropdownTemplate,
                    ]);
                  }}
                  variant="outline"
                  className="flex items-center gap-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Option
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      );
    } else if (input.type === InputType.CHECKBOX) {
      typeSpecificFields = (
        <div className="space-y-2">
          <Label className="text-blue-700 dark:text-blue-300">
            Checkbox Options
          </Label>
          {input.checkboxTemplates.length > 0 ? (
            <div>
              <CheckboxOptionList
                options={input.checkboxTemplates.map((item) => ({
                  id: item.id.toString(),
                  name: item.name,
                  isCheckedByDefault: item.defaultChecked,
                  order: item.order || 0,
                }))}
                onAddOption={(option: {
                  name: string;
                  isCheckedByDefault: boolean;
                  order: number;
                }) => {
                  // Check if checkbox with the same name already exists
                  const existingCheckbox = input.checkboxTemplates.find(
                    (item) =>
                      item.name.toLowerCase() === option.name.toLowerCase()
                  );

                  if (existingCheckbox) {
                    // Checkbox already exists, show a notification or alert the user
                    alert(`Checkbox "${option.name}" already exists.`);
                    return;
                  }

                  // Create a new checkbox template
                  const newCheckboxTemplate = {
                    id: Math.random().toString(36).substring(2, 9),
                    name: option.name,
                    defaultChecked: option.isCheckedByDefault,
                    order: option.order,
                    inputTemplateId: input.id,
                  };

                  handleInputChange("checkboxTemplates", [
                    ...input.checkboxTemplates,
                    newCheckboxTemplate,
                  ]);
                }}
                onUpdateOption={(
                  optionId: string,
                  updatedOption: {
                    name?: string;
                    isCheckedByDefault?: boolean;
                    order?: number;
                  }
                ) => {
                  const updatedTemplates = input.checkboxTemplates.map((item) =>
                    item.id.toString() === optionId
                      ? {
                          ...item,
                          name: updatedOption.name || item.name,
                          defaultChecked:
                            updatedOption.isCheckedByDefault !== undefined
                              ? updatedOption.isCheckedByDefault
                              : item.defaultChecked,
                        }
                      : item
                  );

                  handleInputChange("checkboxTemplates", updatedTemplates);
                }}
                onDeleteOption={(optionId: string) => {
                  const updatedTemplates = input.checkboxTemplates.filter(
                    (item) => item.id.toString() !== optionId
                  );

                  handleInputChange("checkboxTemplates", updatedTemplates);
                }}
              />

              {input.checkboxTemplates.length > 0 && (
                <div className="mt-6 pt-2 border-t">
                  <h4 className="text-sm font-medium mb-3">Checkbox Actions</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <Select
                      value={
                        selectedCheckboxId?.toString() ||
                        input.checkboxTemplates[0].id.toString()
                      }
                      onValueChange={(value) => setSelectedCheckboxId(value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select checkbox" />
                      </SelectTrigger>
                      <SelectContent>
                        {input.checkboxTemplates.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {currentCheckbox?.conditionalAction ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Remove conditional action
                          if (!selectedCheckboxId) return;

                          const updatedTemplates = input.checkboxTemplates.map(
                            (template) =>
                              template.id.toString() === selectedCheckboxId
                                ? { ...template, conditionalAction: null }
                                : template
                          );

                          handleInputChange(
                            "checkboxTemplates",
                            updatedTemplates
                          );
                        }}
                        className="h-9"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove Action
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Add a default conditional action
                          if (!selectedCheckboxId || !currentCheckbox) return;

                          const newAction: ConditionalAction = {
                            id: Math.floor(Math.random() * 10000),
                            conditionType: ConditionType.EQUALS,
                            conditionValue: "true",
                            actionType:
                              ConditionalActionType.MARK_FIELD_AS_DONE,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                          };

                          const updatedTemplates = input.checkboxTemplates.map(
                            (template) =>
                              template.id.toString() === selectedCheckboxId
                                ? { ...template, conditionalAction: newAction }
                                : template
                          );

                          handleInputChange(
                            "checkboxTemplates",
                            updatedTemplates
                          );
                        }}
                        className="h-9"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Action
                      </Button>
                    )}
                  </div>

                  {currentCheckbox?.conditionalAction && (
                    <Card className="border-blue-100 dark:border-blue-900">
                      <CardContent className="p-3 space-y-3">
                        <p className="text-sm">
                          When{" "}
                          <span className="font-semibold">
                            {currentCheckbox.name}
                          </span>{" "}
                          is checked:
                        </p>

                        <div className="space-y-2">
                          <Label className="text-xs">Action</Label>
                          <Select
                            value={currentCheckbox.conditionalAction.actionType}
                            onValueChange={(value) => {
                              if (!selectedCheckboxId) return;

                              const updatedTemplates =
                                input.checkboxTemplates.map((template) =>
                                  template.id.toString() === selectedCheckboxId
                                    ? {
                                        ...template,
                                        conditionalAction: {
                                          ...template.conditionalAction!,
                                          actionType: value,
                                        },
                                      }
                                    : template
                                );

                              handleInputChange(
                                "checkboxTemplates",
                                updatedTemplates
                              );
                            }}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value={ConditionalActionType.MARK_TASK_AS_DONE}
                              >
                                Mark Task as Done
                              </SelectItem>
                              <SelectItem
                                value={ConditionalActionType.MARK_FN_AS_DONE}
                              >
                                Mark Function as Done
                              </SelectItem>
                              <SelectItem
                                value={ConditionalActionType.MARK_FIELD_AS_DONE}
                              >
                                Mark Field as Done
                              </SelectItem>
                              <SelectItem
                                value={ConditionalActionType.NOTIFY_USERS}
                              >
                                Notify Users
                              </SelectItem>
                              <SelectItem
                                value={ConditionalActionType.ADD_DYNAMIC_INPUT}
                              >
                                Add Dynamic Input
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {(currentCheckbox.conditionalAction.actionType ===
                          ConditionalActionType.NOTIFY_USERS ||
                          currentCheckbox.conditionalAction.actionType ===
                            ConditionalActionType.ADD_DYNAMIC_INPUT) && (
                          <div className="space-y-2">
                            <Label className="text-xs">
                              {currentCheckbox.conditionalAction.actionType ===
                              ConditionalActionType.NOTIFY_USERS
                                ? "User IDs (comma separated)"
                                : "Input Template ID"}
                            </Label>
                            <Input
                              value={
                                currentCheckbox.conditionalAction.actionValue ||
                                ""
                              }
                              onChange={(e) => {
                                if (!selectedCheckboxId) return;

                                const updatedTemplates =
                                  input.checkboxTemplates.map((template) =>
                                    template.id.toString() ===
                                    selectedCheckboxId
                                      ? {
                                          ...template,
                                          conditionalAction: {
                                            ...template.conditionalAction!,
                                            actionValue: e.target.value,
                                          },
                                        }
                                      : template
                                  );

                                handleInputChange(
                                  "checkboxTemplates",
                                  updatedTemplates
                                );
                              }}
                              className="h-8"
                              placeholder={
                                currentCheckbox.conditionalAction.actionType ===
                                ConditionalActionType.NOTIFY_USERS
                                  ? "e.g. 1,2,3"
                                  : "e.g. 123"
                              }
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-base text-blue-800 dark:text-blue-200">
                  No Checkboxes
                </CardTitle>
                <CardDescription>
                  This input doesn't have any checkbox options yet. Add checkbox
                  options with their default states.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    // Create the first checkbox option
                    const newCheckboxTemplate = {
                      id: Math.random().toString(36).substring(2, 9),
                      name: "New Checkbox",
                      defaultChecked: false,
                      order: 0,
                      inputTemplateId: input.id,
                    };

                    handleInputChange("checkboxTemplates", [
                      newCheckboxTemplate,
                    ]);
                  }}
                  variant="outline"
                  className="flex items-center gap-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Checkbox
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    // Only show conditional action section for input types other than DROPDOWN and CHECKBOX
    const conditionalActionSection =
      input.type !== InputType.DROPDOWN && input.type !== InputType.CHECKBOX ? (
        <div className="space-y-4 mt-6 pt-4 border-t border-blue-200 dark:border-blue-800">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
              Conditional Actions
            </h3>
            {input.conditionalAction ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveConditionalAction}
                className="flex items-center gap-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/50"
              >
                <X className="h-4 w-4" />
                Remove Action
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddConditionalAction()}
                className="flex items-center gap-1 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
              >
                <Plus className="h-4 w-4" />
                Add Action
              </Button>
            )}
          </div>

          {input.conditionalAction ? (
            <div className="space-y-4 border rounded-md p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="condition-type">Condition Type</Label>
                  <Select
                    value={input.conditionalAction.conditionType}
                    onValueChange={(value) =>
                      handleUpdateConditionalAction("conditionType", value)
                    }
                  >
                    <SelectTrigger id="condition-type">
                      <SelectValue placeholder="Select condition type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ConditionType.EQUALS}>
                        Equals
                      </SelectItem>
                      <SelectItem value={ConditionType.LESS_THAN}>
                        Less Than
                      </SelectItem>
                      <SelectItem value={ConditionType.LESS_THAN_EQUALS}>
                        Less Than or Equal
                      </SelectItem>
                      <SelectItem value={ConditionType.GREATER_THAN}>
                        Greater Than
                      </SelectItem>
                      <SelectItem value={ConditionType.GREATER_THAN_EQUALS}>
                        Greater Than or Equal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="condition-value">Condition Value</Label>
                  <Input
                    id="condition-value"
                    value={input.conditionalAction.conditionValue}
                    onChange={(e) =>
                      handleUpdateConditionalAction(
                        "conditionValue",
                        e.target.value
                      )
                    }
                    placeholder="Value to compare against"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="action-type">Action Type</Label>
                  <Select
                    value={input.conditionalAction.actionType}
                    onValueChange={(value) =>
                      handleUpdateConditionalAction("actionType", value)
                    }
                  >
                    <SelectTrigger id="action-type">
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value={ConditionalActionType.MARK_TASK_AS_DONE}
                      >
                        Mark Task as Done
                      </SelectItem>
                      <SelectItem value={ConditionalActionType.MARK_FN_AS_DONE}>
                        Mark Function as Done
                      </SelectItem>
                      <SelectItem
                        value={ConditionalActionType.MARK_FIELD_AS_DONE}
                      >
                        Mark Field as Done
                      </SelectItem>
                      <SelectItem value={ConditionalActionType.NOTIFY_USERS}>
                        Notify Users
                      </SelectItem>
                      <SelectItem
                        value={ConditionalActionType.ADD_DYNAMIC_INPUT}
                      >
                        Add Dynamic Input
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {input.conditionalAction.actionType ===
                  ConditionalActionType.NOTIFY_USERS && (
                  <div>
                    <Label htmlFor="action-value">
                      User IDs (comma separated)
                    </Label>
                    <Input
                      id="action-value"
                      value={input.conditionalAction.actionValue || ""}
                      onChange={(e) =>
                        handleUpdateConditionalAction(
                          "actionValue",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 1,2,3"
                    />
                  </div>
                )}
                {input.conditionalAction.actionType ===
                  ConditionalActionType.ADD_DYNAMIC_INPUT && (
                  <div>
                    <Label htmlFor="action-value">Input Template ID</Label>
                    <Input
                      id="action-value"
                      value={input.conditionalAction.actionValue || ""}
                      onChange={(e) =>
                        handleUpdateConditionalAction(
                          "actionValue",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 123"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Add a conditional action to make this input trigger actions based
              on its value.
            </p>
          )}
        </div>
      ) : null;

    return (
      <div className="space-y-4">
        {commonFields}
        {typeSpecificFields && (
          <div className="mt-6 pt-4 border-t border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-medium mb-4 text-blue-700 dark:text-blue-300">
              Type-specific Configuration
            </h3>
            {typeSpecificFields}
          </div>
        )}
        {conditionalActionSection}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelEdit}
            className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSaveInput}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="h-4 w-4 mr-1" />
            Save Changes
          </Button>
        </div>
      </div>
    );
  };

  // Update the renderInputDetails to show conditional actions at the item level
  const renderInputDetails = (input: ExtendedInputTemplate) => {
    // If we're editing this input, show the edit form
    if (editingInputId === input.id && editedInput) {
      return renderInputEditForm(editedInput);
    }

    // Otherwise show the display view for each input type
    switch (input.type) {
      case InputType.DROPDOWN:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Type:</p>
                <Badge>{input.type}</Badge>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Required:</p>
                <p className="text-sm">{input.isRequired ? "Yes" : "No"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Multi-select:</p>
                <p className="text-sm">
                  {input.validationRules?.multiSelect ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Dropdown Options:</p>
              {input.dropdownTemplates.length > 0 &&
              input.dropdownTemplates[0].dropdownItems.length > 0 ? (
                <div className="border rounded-md p-3 space-y-2">
                  {input.dropdownTemplates[0].dropdownItems.map((item) => (
                    <div key={item.id} className="py-2 border-b last:border-0">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.name}</span>
                        {item.conditionalAction && (
                          <Badge variant="secondary" className="text-xs">
                            Has Conditional Action
                          </Badge>
                        )}
                      </div>

                      {item.conditionalAction && (
                        <div className="mt-2 ml-4 text-xs text-muted-foreground">
                          <p>
                            Action:{" "}
                            {renderActionLabel(
                              item.conditionalAction.actionType,
                              item.conditionalAction.actionValue
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground border rounded-md p-3">
                  No dropdown options defined
                </p>
              )}
            </div>
          </div>
        );

      case InputType.CHECKBOX:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Type:</p>
                <Badge>{input.type}</Badge>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Required:</p>
                <p className="text-sm">{input.isRequired ? "Yes" : "No"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Checkbox Options:</p>
              {input.checkboxTemplates.length > 0 ? (
                <div className="border rounded-md p-3 space-y-2">
                  {input.checkboxTemplates.map((checkbox) => (
                    <div
                      key={checkbox.id}
                      className="py-2 border-b last:border-0"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {checkbox.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {checkbox.defaultChecked
                              ? "Default: Checked"
                              : "Default: Unchecked"}
                          </Badge>
                          {checkbox.conditionalAction && (
                            <Badge variant="secondary" className="text-xs">
                              Has Conditional Action
                            </Badge>
                          )}
                        </div>
                      </div>

                      {checkbox.conditionalAction && (
                        <div className="mt-2 ml-4 text-xs text-muted-foreground">
                          <p>
                            When checked:{" "}
                            {renderActionLabel(
                              checkbox.conditionalAction.actionType,
                              checkbox.conditionalAction.actionValue
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground border rounded-md p-3">
                  No checkbox options defined
                </p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Type:</p>
                <Badge>{input.type}</Badge>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Required:</p>
                <p className="text-sm">{input.isRequired ? "Yes" : "No"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Description:</p>
                <p className="text-sm">{input.description || "None"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Order:</p>
                <p className="text-sm">{input.order}</p>
              </div>
            </div>

            {input.conditionalAction && (
              <div className="mt-4 pt-3 border-t">
                <p className="text-sm font-medium mb-2">Conditional Action:</p>
                {renderConditionalAction(input.conditionalAction)}
              </div>
            )}
          </div>
        );
    }
  };

  // Helper function to render action labels
  const renderActionLabel = (
    actionType: ConditionalActionType,
    actionValue?: string
  ) => {
    switch (actionType) {
      case ConditionalActionType.MARK_TASK_AS_DONE:
        return "Mark task as complete";
      case ConditionalActionType.MARK_FN_AS_DONE:
        return "Mark function as complete";
      case ConditionalActionType.MARK_FIELD_AS_DONE:
        return "Mark field as complete";
      case ConditionalActionType.NOTIFY_USERS:
        return `Notify users ${actionValue ? `(${actionValue})` : ""}`;
      case ConditionalActionType.ADD_DYNAMIC_INPUT:
        return `Add dynamic input ${actionValue ? `(ID: ${actionValue})` : ""}`;
      default:
        return actionType;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("/home/templates")}>
              Templates
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate(`/home/templates/${taskTemplateId}`)}
            >
              {taskTemplate.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleGoBack}>
              {functionTemplate.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{fieldTemplate.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="ghost" onClick={handleGoBack} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Function
          </Button>
          <h1 className="text-2xl font-bold">{fieldTemplate.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">Field {fieldTemplate.order}</Badge>
            <p className="text-muted-foreground">
              {fieldTemplate.inputTemplates.length} inputs
            </p>
          </div>
          <p className="text-muted-foreground mt-2">
            {fieldTemplate.description}
          </p>
        </div>
        <div>
          <Button onClick={handleCreateInput}>
            <Plus className="h-4 w-4 mr-2" />
            Add Input
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar: List of inputs */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Inputs</CardTitle>
              <CardDescription>
                Configure the inputs for this field
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {fieldTemplate.inputTemplates.length > 0 ? (
                <div className="divide-y">
                  {fieldTemplate.inputTemplates.map((input) => (
                    <div
                      key={input.id}
                      className={`
                        px-4 py-3 cursor-pointer
                        ${
                          editingInputId === input.id
                            ? "bg-primary/10 border-l-4 border-primary"
                            : "hover:bg-muted/50 border-l-4 border-transparent"
                        }
                      `}
                      onClick={() => handleEditInput(input)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{input.name}</h3>
                        <Badge>{input.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {input.description || "No description"}
                      </p>
                      <div className="flex items-center gap-2">
                        {input.isRequired && (
                          <Badge variant="outline" className="text-xs">
                            Required
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          Order: {input.order}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6">
                  <p className="text-muted-foreground mb-4 text-center">
                    No inputs have been added to this field yet
                  </p>
                  <Button onClick={handleCreateInput}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Input
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right content: Selected input details or form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {editingInputId !== null
                  ? `Edit: ${editedInput?.name}`
                  : "Input Details"}
              </CardTitle>
              <CardDescription>
                {editingInputId !== null
                  ? `Configure properties for this ${editedInput?.type} input`
                  : "Select an input from the left sidebar to view or edit"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editingInputId !== null && editedInput ? (
                renderInputEditForm(editedInput)
              ) : editedInput ? (
                renderInputDetails(editedInput as ExtendedInputTemplate)
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Edit className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No Input Selected
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Select an input from the left sidebar to view and configure
                    its properties
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
