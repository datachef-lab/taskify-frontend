import { useEffect, useState } from "react";
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
import { mockTaskTemplatesWithRelations } from "@/lib/data/mockTemplates";
import {
  InputType,
  ConditionType,
  ConditionalActionType,
} from "@/lib/types/enums";
import {
  TaskTemplateWithRelations,
  FnTemplateWithRelations,
  FieldTemplateWithInputs,
  InputTemplateWithRelations,
  DropdownItemWithActions,
  DropdownTemplateWithItems,
  CheckboxTemplateWithActions,
  ConditionalAction,
} from "@/lib/types/task";
import { DropdownOptionList } from "@/components/templates/DropdownOptionList";
import { CheckboxOptionList } from "@/components/templates/CheckboxOptionList";

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

export default function FnTemplatePage() {
  const { taskTemplateId, fnTemplateId } = useParams();
  const navigate = useNavigate();
  const [taskTemplate, setTaskTemplate] =
    useState<TaskTemplateWithRelations | null>(null);
  const [functionTemplate, setFunctionTemplate] =
    useState<FnTemplateWithRelations | null>(null);
  const [selectedInput, setSelectedInput] =
    useState<InputTemplateWithRelations | null>(null);

  useEffect(() => {
    // Find the task template and function template
    const template = mockTaskTemplatesWithRelations.find(
      (t) => t.id === Number(taskTemplateId)
    );
    if (template) {
      setTaskTemplate(template);

      const fnTemplate = template.fnTemplates.find(
        (fn) => fn.id === Number(fnTemplateId)
      );
      if (fnTemplate) {
        setFunctionTemplate(fnTemplate);

        // Set the first field as active by default if it exists
        if (fnTemplate.fieldTemplates && fnTemplate.fieldTemplates.length > 0) {
          setSelectedInput(fnTemplate.fieldTemplates[0]);
        }
      } else {
        navigate(`/home/templates/${taskTemplateId}`);
      }
    } else {
      navigate("/home/templates");
    }
  }, [taskTemplateId, fnTemplateId, navigate]);

  const handleGoBack = () => {
    navigate(`/home/templates/${taskTemplateId}`);
  };

  const handleCreateField = () => {
    // Navigate to field creation page or show modal
    // For now this is a placeholder
    console.log("Create field");
  };

  const handleEditInput = (input: InputTemplateWithRelations) => {
    setSelectedInput(input);
  };

  const handleCancelEdit = () => {
    setSelectedInput(null);
  };

  const handleSaveInput = () => {
    if (!selectedInput || !functionTemplate) return;

    // In a real application, this would call an API to update the input template
    // For this demo, we'll update it in the local state
    const updatedInputTemplates = functionTemplate.fieldTemplates.map((field) =>
      field.inputTemplates.map((input) =>
        input.id === selectedInput.id ? selectedInput : input
      )
    );

    const updatedFieldTemplates = functionTemplate.fieldTemplates.map(
      (field, index) =>
        field.id === selectedInput.id
          ? { ...field, inputTemplates: updatedInputTemplates[index] }
          : field
    );

    setFunctionTemplate({
      ...functionTemplate,
      fieldTemplates: updatedFieldTemplates,
    });

    // Exit edit mode
    setSelectedInput(null);
  };

  const handleInputChange = (property: string, value: unknown) => {
    if (!selectedInput) return;
    setSelectedInput({
      ...selectedInput,
      [property]: value,
    });
  };

  const handleTypeChange = (value: string) => {
    if (!selectedInput) return;

    // Convert string to InputType enum
    const newType = value as InputType;

    // Reset type-specific properties when changing types
    setSelectedInput({
      ...selectedInput,
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
        ...(selectedInput.validationRules || {}),
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

  const handleFieldRowClick = (fieldId: number) => {
    navigate(`${fieldId}`);
  };

  if (!taskTemplate || !functionTemplate) {
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
            <Label htmlFor="input-name">Name</Label>
            <Input
              id="input-name"
              value={input.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="input-type">Type</Label>
            <Select value={input.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
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
            <Label htmlFor="input-description">Description</Label>
            <Textarea
              id="input-description"
              value={input.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="input-required" className="block mb-2">
              Required
            </Label>
            <div className="flex items-center">
              <Switch
                id="input-required"
                checked={input.isRequired}
                onCheckedChange={(checked) =>
                  handleInputChange("isRequired", checked)
                }
              />
              <span className="ml-2">{input.isRequired ? "Yes" : "No"}</span>
            </div>
            <div className="mt-4">
              <Label htmlFor="input-order">Order</Label>
              <Input
                id="input-order"
                type="number"
                value={input.order.toString()}
                onChange={(e) =>
                  handleInputChange("order", parseInt(e.target.value) || 1)
                }
              />
            </div>
          </div>
        </div>
      </>
    );

    // Type-specific fields
    let typeSpecificFields = null;

    switch (input.type) {
      case InputType.TEXT:
      case InputType.TEXTAREA:
      case InputType.EMAIL:
      case InputType.PHONE:
        typeSpecificFields = (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="input-placeholder">Placeholder</Label>
              <Input
                id="input-placeholder"
                value={input.placeholder || ""}
                onChange={(e) =>
                  handleInputChange("placeholder", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="input-default-value">Default Value</Label>
              <Input
                id="input-default-value"
                value={input.defaultValue || ""}
                onChange={(e) =>
                  handleInputChange("defaultValue", e.target.value)
                }
              />
            </div>
          </div>
        );
        break;

      case InputType.NUMBER:
      case InputType.AMOUNT:
        typeSpecificFields = (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="input-placeholder">Placeholder</Label>
              <Input
                id="input-placeholder"
                value={input.placeholder || ""}
                onChange={(e) =>
                  handleInputChange("placeholder", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="input-default-value">Default Value</Label>
              <Input
                id="input-default-value"
                value={input.defaultValue || ""}
                onChange={(e) =>
                  handleInputChange("defaultValue", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="input-min">Min Value</Label>
              <Input
                id="input-min"
                type="number"
                value={input.min !== undefined ? input.min : ""}
                onChange={(e) =>
                  handleInputChange(
                    "min",
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="input-max">Max Value</Label>
              <Input
                id="input-max"
                type="number"
                value={input.max !== undefined ? input.max : ""}
                onChange={(e) =>
                  handleInputChange(
                    "max",
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
              />
            </div>
            {input.type === InputType.AMOUNT && (
              <div className="col-span-2">
                <Label htmlFor="input-currency-format">Currency Format</Label>
                <Select
                  value={
                    (input.validationRules?.currencyFormat as string) || "USD"
                  }
                  onValueChange={(value) =>
                    handleInputChange("validationRules", {
                      ...input.validationRules,
                      currencyFormat: value,
                    })
                  }
                >
                  <SelectTrigger id="input-currency-format">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        );
        break;

      case InputType.DATE:
        typeSpecificFields = (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="input-min-date">Min Date</Label>
              <Input
                id="input-min-date"
                type="date"
                value={input.minDate || ""}
                onChange={(e) =>
                  handleInputChange("minDate", e.target.value || undefined)
                }
              />
            </div>
            <div>
              <Label htmlFor="input-max-date">Max Date</Label>
              <Input
                id="input-max-date"
                type="date"
                value={input.maxDate || ""}
                onChange={(e) =>
                  handleInputChange("maxDate", e.target.value || undefined)
                }
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="input-date-format">Date Format</Label>
              <Select
                value={
                  (input.validationRules?.dateFormat as string) || "MM/DD/YYYY"
                }
                onValueChange={(value) =>
                  handleInputChange("validationRules", {
                    ...input.validationRules,
                    dateFormat: value,
                  })
                }
              >
                <SelectTrigger id="input-date-format">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        break;

      case InputType.DROPDOWN:
        typeSpecificFields = (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="input-placeholder">Placeholder</Label>
                <Input
                  id="input-placeholder"
                  value={input.placeholder || ""}
                  onChange={(e) =>
                    handleInputChange("placeholder", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="input-multi-select">
                  Allow Multiple Selection
                </Label>
                <div className="flex items-center h-10 mt-2">
                  <Switch
                    id="input-multi-select"
                    checked={Boolean(input.validationRules?.multiSelect)}
                    onCheckedChange={(checked) =>
                      handleInputChange("validationRules", {
                        ...input.validationRules,
                        multiSelect: checked,
                      })
                    }
                  />
                  <span className="ml-2">
                    {Boolean(input.validationRules?.multiSelect) ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dropdown Options</Label>
              {input.dropdownTemplates.length > 0 &&
              input.dropdownTemplates[0].dropdownItems.length > 0 ? (
                <DropdownOptionList
                  options={input.dropdownTemplates.flatMap(
                    (dt: DropdownTemplateWithItems) => dt.dropdownItems
                  )}
                  inputId={input.id}
                  onAddOption={() => {
                    /* TODO: Implement */
                  }}
                  onEditOption={() => {
                    /* TODO: Implement */
                  }}
                  onDeleteOption={() => {
                    /* TODO: Implement */
                  }}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Options</CardTitle>
                    <CardDescription>
                      This dropdown doesn't have any options yet. You need to
                      add options for users to select from.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => {
                        /* TODO: Implement */
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Your First Option
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        break;

      case InputType.CHECKBOX:
        typeSpecificFields = (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Checkbox Options</Label>
              {input.checkboxTemplates && input.checkboxTemplates.length > 0 ? (
                <CheckboxOptionList
                  options={input.checkboxTemplates}
                  inputId={input.id}
                  onAddOption={() => {
                    /* TODO: Implement */
                  }}
                  onEditOption={() => {
                    /* TODO: Implement */
                  }}
                  onDeleteOption={() => {
                    /* TODO: Implement */
                  }}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Checkboxes</CardTitle>
                    <CardDescription>
                      This input doesn't have any checkbox options yet. Add
                      checkbox options with their default states.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => {
                        /* TODO: Implement */
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Your First Checkbox
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
        break;

      case InputType.FILE:
      case InputType.MULTIPLE_FILES:
        typeSpecificFields = (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="input-allowed-extensions">
                Allowed Extensions
              </Label>
              <Input
                id="input-allowed-extensions"
                value={input.allowedExtensions || ""}
                onChange={(e) =>
                  handleInputChange("allowedExtensions", e.target.value)
                }
                placeholder="e.g. .pdf,.docx,.jpg"
              />
            </div>
            <div>
              <Label htmlFor="input-max-size">Max Size (MB)</Label>
              <Input
                id="input-max-size"
                type="number"
                value={input.maxSize !== undefined ? input.maxSize : ""}
                onChange={(e) =>
                  handleInputChange(
                    "maxSize",
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
              />
            </div>
            {input.type === InputType.MULTIPLE_FILES && (
              <>
                <div>
                  <Label htmlFor="input-min-files">Min Files</Label>
                  <Input
                    id="input-min-files"
                    type="number"
                    value={input.min !== undefined ? input.min : ""}
                    onChange={(e) =>
                      handleInputChange(
                        "min",
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="input-max-files">Max Files</Label>
                  <Input
                    id="input-max-files"
                    type="number"
                    value={input.max !== undefined ? input.max : ""}
                    onChange={(e) =>
                      handleInputChange(
                        "max",
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                  />
                </div>
              </>
            )}
          </div>
        );
        break;

      default:
        typeSpecificFields = (
          <div className="py-4 text-center text-muted-foreground">
            <p>Basic configuration is available for this input type.</p>
            <p className="text-sm mt-2">
              Additional configuration options may be available later.
            </p>
          </div>
        );
        break;
    }

    return (
      <div className="space-y-4">
        {commonFields}
        {typeSpecificFields}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleCancelEdit}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button size="sm" onClick={handleSaveInput}>
            <Save className="h-4 w-4 mr-1" />
            Save Changes
          </Button>
        </div>
      </div>
    );
  };

  // Function to render appropriate UI for different input types
  const renderInputDetails = (input: ExtendedInputTemplate) => {
    // Declare variables outside of case blocks to avoid lexical declaration errors
    let hasOptions;

    // If we're editing this input, show the edit form
    if (selectedInput && selectedInput.id === input.id) {
      return renderInputEditForm(input);
    }

    // Otherwise show the display view
    switch (input.type) {
      case InputType.TEXT:
      case InputType.TEXTAREA:
      case InputType.EMAIL:
      case InputType.PHONE:
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
                <p className="text-sm font-medium">Placeholder:</p>
                <p className="text-sm">{input.placeholder || "None"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Default Value:</p>
                <p className="text-sm">{input.defaultValue || "None"}</p>
              </div>
              {input.validationRules && (
                <div className="flex justify-between col-span-2">
                  <p className="text-sm font-medium">Validation:</p>
                  <div className="text-sm text-right">
                    {input.validationRules.pattern && (
                      <p>Pattern: {String(input.validationRules.pattern)}</p>
                    )}
                    {input.validationRules.minLength && (
                      <p>
                        Min Length: {String(input.validationRules.minLength)}
                      </p>
                    )}
                    {input.validationRules.maxLength && (
                      <p>
                        Max Length: {String(input.validationRules.maxLength)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case InputType.NUMBER:
      case InputType.AMOUNT:
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
                <p className="text-sm font-medium">Placeholder:</p>
                <p className="text-sm">{input.placeholder || "None"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Default Value:</p>
                <p className="text-sm">{input.defaultValue || "None"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Min Value:</p>
                <p className="text-sm">
                  {input.min !== undefined ? input.min : "None"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Max Value:</p>
                <p className="text-sm">
                  {input.max !== undefined ? input.max : "None"}
                </p>
              </div>
              {input.type === InputType.AMOUNT && (
                <div className="flex justify-between col-span-2">
                  <p className="text-sm font-medium">Currency Format:</p>
                  <p className="text-sm">
                    {input.validationRules?.currencyFormat || "Default"}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case InputType.DATE:
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
                <p className="text-sm font-medium">Min Date:</p>
                <p className="text-sm">
                  {input.minDate
                    ? new Date(input.minDate).toLocaleDateString()
                    : "None"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Max Date:</p>
                <p className="text-sm">
                  {input.maxDate
                    ? new Date(input.maxDate).toLocaleDateString()
                    : "None"}
                </p>
              </div>
              <div className="flex justify-between col-span-2">
                <p className="text-sm font-medium">Format:</p>
                <p className="text-sm">
                  {input.validationRules?.dateFormat || "MM/DD/YYYY"}
                </p>
              </div>
            </div>
          </div>
        );

      case InputType.DROPDOWN:
        hasOptions =
          input.dropdownTemplates &&
          input.dropdownTemplates[0]?.dropdownItems.length > 0;
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Type:</p>
              <Badge>{input.type}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Required:</p>
              <p className="text-sm">{input.isRequired ? "Yes" : "No"}</p>
            </div>
            {input.validationRules?.multiSelect && (
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Multiple Selection:</p>
                <Badge variant="outline">Enabled</Badge>
              </div>
            )}

            <div>
              <p className="text-sm font-medium mb-2">Dropdown Options:</p>
              {hasOptions && (
                <div className="border rounded-md p-3 space-y-3">
                  {input.dropdownTemplates[0].dropdownItems.map(
                    (item: DropdownItemWithActions) => (
                      <div
                        key={item.id}
                        className="flex flex-col space-y-2 py-2 border-b last:border-0"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          <Badge variant="outline">Value: {item.value}</Badge>
                        </div>

                        {item.conditionalAction && (
                          <div className="pl-2 border-l-2 border-primary/20">
                            <p className="text-xs text-muted-foreground mb-1">
                              When selected:
                            </p>
                            {renderConditionalAction(item.conditionalAction)}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case InputType.CHECKBOX:
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Type:</p>
              <Badge>{input.type}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Required:</p>
              <p className="text-sm">{input.isRequired ? "Yes" : "No"}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Checkbox Options:</p>
              {input.checkboxTemplates && input.checkboxTemplates.length > 0 ? (
                <div className="border rounded-md p-3 space-y-3">
                  {input.checkboxTemplates.map(
                    (checkbox: CheckboxTemplateWithActions) => (
                      <div
                        key={checkbox.id}
                        className="flex flex-col space-y-2 py-2 border-b last:border-0"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {checkbox.label}
                          </span>
                          <Badge variant="outline">
                            {checkbox.defaultChecked
                              ? "Default: Checked"
                              : "Default: Unchecked"}
                          </Badge>
                        </div>

                        {checkbox.conditionalAction && (
                          <div className="pl-2 border-l-2 border-primary/20">
                            <p className="text-xs text-muted-foreground mb-1">
                              When checked:
                            </p>
                            {renderConditionalAction(
                              checkbox.conditionalAction
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground border rounded-md p-3">
                  No checkbox options defined
                </p>
              )}
            </div>
          </div>
        );

      case InputType.RICH_TEXT_EDITOR:
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
                <p className="text-sm font-medium">Default Value:</p>
                <p className="text-sm">{input.defaultValue ? "Set" : "None"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Toolbar Config:</p>
                <p className="text-sm">
                  {input.validationRules?.toolbarConfig || "Standard"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Max Length:</p>
                <p className="text-sm">
                  {input.validationRules?.maxLength || "No limit"}
                </p>
              </div>
            </div>
          </div>
        );

      case InputType.FILE:
      case InputType.MULTIPLE_FILES:
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
                <p className="text-sm font-medium">Allowed Extensions:</p>
                <p className="text-sm">{input.allowedExtensions || "All"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Max Size (MB):</p>
                <p className="text-sm">{input.maxSize || "No limit"}</p>
              </div>
              {input.type === InputType.MULTIPLE_FILES && (
                <>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Min Files:</p>
                    <p className="text-sm">{input.min || "1"}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Max Files:</p>
                    <p className="text-sm">{input.max || "No limit"}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case InputType.BOOLEAN:
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
                <p className="text-sm font-medium">Default Value:</p>
                <p className="text-sm">
                  {input.defaultValue === "true"
                    ? "True"
                    : input.defaultValue === "false"
                    ? "False"
                    : "None"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Display as:</p>
                <p className="text-sm">
                  {input.validationRules?.displayAs || "Switch"}
                </p>
              </div>
            </div>
            {input.conditionalAction && (
              <div className="border-t pt-3 mt-3">
                <p className="text-sm font-medium mb-2">When True:</p>
                <div className="pl-2 border-l-2 border-primary/20">
                  {renderConditionalAction(input.conditionalAction)}
                </div>
              </div>
            )}
          </div>
        );

      case InputType.TABLE:
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
                <p className="text-sm font-medium">Min Rows:</p>
                <p className="text-sm">{input.min || "0"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium">Max Rows:</p>
                <p className="text-sm">{input.max || "No limit"}</p>
              </div>
              <div className="flex justify-between col-span-2">
                <p className="text-sm font-medium">Columns:</p>
                <p className="text-sm">
                  {input.validationRules &&
                  input.validationRules.columns?.length
                    ? `${input.validationRules.columns.length} columns defined`
                    : "No columns defined"}
                </p>
              </div>
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
            </div>
            <p className="text-sm text-muted-foreground">
              Basic configuration for {input.type}
            </p>
          </div>
        );
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
            <BreadcrumbLink onClick={handleGoBack}>
              {taskTemplate.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{functionTemplate.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="ghost" onClick={handleGoBack} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Functions
          </Button>
          <h1 className="text-2xl font-bold">{functionTemplate.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge>{functionTemplate.type}</Badge>
            <p className="text-muted-foreground">
              Order: {functionTemplate.order}
            </p>
          </div>
          <p className="text-muted-foreground mt-2">
            {functionTemplate.description}
          </p>
        </div>
        <div>
          <Button onClick={handleCreateField}>
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fields</CardTitle>
          <CardDescription>
            {functionTemplate.fieldTemplates.length > 0
              ? `This function has ${functionTemplate.fieldTemplates.length} fields configured`
              : "This function doesn't have any fields yet"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {functionTemplate.fieldTemplates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Description</th>
                    <th className="text-center p-4 font-medium">Order</th>
                    <th className="text-center p-4 font-medium">Inputs</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {functionTemplate.fieldTemplates.map((field) => (
                    <tr
                      key={field.id}
                      className="border-b hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => handleFieldRowClick(field.id)}
                    >
                      <td className="p-4">
                        <div className="font-medium">{field.name}</div>
                      </td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {field.description || "No description"}
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline">{field.order}</Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="secondary">
                          {field.inputTemplates?.length || 0}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFieldRowClick(field.id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit Field</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Fields Yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                You haven't added any fields to this function yet. Fields help
                organize related inputs together.
              </p>
              <Button onClick={handleCreateField}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Field
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
