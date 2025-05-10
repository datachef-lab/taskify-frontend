import {
    ConditionalActionType,
    ConditionType,
    FnTemplateType,
    InputType,
    PriorityType,
    TaskStatus
} from "./enums";

/**
 * Task Template interfaces
 */
export interface TaskTemplate {
    id: number;
    name: string;
    description?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface FnTemplate {
    id: number;
    taskTemplateId: number;
    name: string;
    description?: string;
    order: number;
    type: FnTemplateType;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface FieldTemplate {
    id: number;
    fnTemplateId: number;
    name: string;
    description?: string;
    order: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface InputTemplate {
    id: number;
    fieldTemplateId: number;
    name: string;
    description?: string;
    type: InputType;
    isRequired: boolean;
    order: number;
    defaultValue?: string;
    placeholder?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface DropdownItem {
    id: number;
    dropdownTemplateId: number;
    name: string;
    order: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface DropdownTemplate {
    id: number;
    fnTemplateId: number;
    inputTemplateId: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface CheckboxTemplate {
    id: number;
    inputTemplateId: number;
    name: string;
    defaultChecked: boolean;
    order: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface ConditionalAction {
    id: number;
    conditionType: ConditionType;
    conditionValue: string;
    actionType: ConditionalActionType;
    actionValue?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface MetadataTemplate {
    id: number;
    inputTemplateId: number;
    name: string;
    description?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Enhanced versions with nested objects
 */
export interface DropdownItemWithActions extends DropdownItem {
    conditionalAction: ConditionalAction | null;
}

export interface DropdownTemplateWithItems extends DropdownTemplate {
    dropdownItems: DropdownItemWithActions[];
}

export interface CheckboxTemplateWithActions extends CheckboxTemplate {
    conditionalAction: ConditionalAction | null;
}

export interface InputTemplateWithRelations extends InputTemplate {
    dropdownTemplates: DropdownTemplateWithItems[];
    checkboxTemplates: CheckboxTemplateWithActions[];
    conditionalAction: ConditionalAction | null;
}

export interface FieldTemplateWithInputs extends FieldTemplate {
    inputTemplates: InputTemplateWithRelations[];
}

export interface NextFollowUp {
    id: number;
    fnTemplateId: number;
    nextFnTemplateId: number;
    name: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface FnTemplateWithRelations extends FnTemplate {
    fieldTemplates: FieldTemplateWithInputs[];
    dropdownTemplates: DropdownTemplateWithItems[];
    nextFollowUps: NextFollowUp[];
}

export interface MetadataTemplateWithInput extends Omit<MetadataTemplate, "inputTemplateId"> {
    inputTemplate: InputTemplateWithRelations;
}

export interface TaskTemplateWithRelations extends TaskTemplate {
    fnTemplates: FnTemplateWithRelations[];
    metadataTemplates: MetadataTemplateWithInput[];
}

/**
 * Task Instance interfaces
 */
export interface TaskInstance {
    id: number;
    taskTemplateId: number;
    code: string;
    customerId: number;
    priority: PriorityType;
    createdById: number;
    assigneeId: number;
    closedById?: number;
    isArchived: boolean;
    status: TaskStatus;
    remarks?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    closedAt?: string | Date;
}

export interface FnInstance {
    id: number;
    taskInstanceId: number;
    fnTemplateId: number;
    isComplete: boolean;
    completedById?: number;
    completedAt?: string | Date;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface FieldInstance {
    id: number;
    fnInstanceId: number;
    fieldTemplateId: number;
    isComplete: boolean;
    completedById?: number;
    completedAt?: string | Date;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface InputInstance {
    id: number;
    fieldInstanceId: number;
    inputTemplateId: number;
    value?: string;
    isComplete: boolean;
    completedById?: number;
    completedAt?: string | Date;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface CheckboxInstance {
    id: number;
    inputInstanceId: number;
    checkboxTemplateId: number;
    isChecked: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface TableColumnInstance {
    id: number;
    inputInstanceId: number;
    name: string;
    order: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface TableRowInstance {
    id: number;
    inputInstanceId: number;
    order: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface TableCellInstance {
    id: number;
    rowInstanceId: number;
    columnInstanceId: number;
    value: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface MetadataInstance {
    id: number;
    taskInstanceId: number;
    metadataTemplateId: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Enhanced Task Instance types with nested relations
 */
export interface TableRowInstanceWithCells extends TableRowInstance {
    cells: TableCellInstance[];
}

export interface InputInstanceWithRelations extends InputInstance {
    checkboxInstances: CheckboxInstance[] | null;
    table: {
        header: TableColumnInstance[];
        rows: TableRowInstanceWithCells[];
    } | null;
}

export interface FieldInstanceWithInputs extends FieldInstance {
    inputInstances: InputInstanceWithRelations[];
}

export interface FnInstanceWithFields extends FnInstance {
    fieldInstances: FieldInstanceWithInputs[];
}

export interface MetadataInstanceWithTemplate extends Omit<MetadataInstance, "metadataTemplateId"> {
    metadataTemplate: MetadataTemplateWithInput;
}

export interface TaskInstanceWithRelations extends TaskInstance {
    metadataInstances: MetadataInstanceWithTemplate[];
    fnInstances: FnInstanceWithFields[];
}

/**
 * Task Summary interface
 */
export interface TaskSummary {
    id: number;
    taskInstanceId: number;
    code: string;
    title: string;
    description?: string;
    customerId: number;
    customerName: string;
    status: TaskStatus;
    priority: PriorityType;
    assigneeId: number;
    assigneeName: string;
    dueDate?: string | Date;
    completionPercentage: number;
    isArchived: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Simple Task interface for UI components
 */
export interface SimpleTask {
    id: string;
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high";
    dueDate?: string | Date;
    assignee?: string;
    createdAt: string | Date;
    updatedAt?: string | Date;
} 