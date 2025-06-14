import { ConditionalActionType, ConditionType, DepartmentType, FnTemplateType, InputType } from "@/types/enums";

export interface ConditionalAction {
    readonly id?: number;
    inputTemplateId: number | null;
    dropdownItemId: number | null;
    checkboxTemplateId: number | null;
    name: string | null;
    description: string | null;
    condition: ConditionType | null;
    comparisonValue: string | null;
    action: ConditionalActionType | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface DropdownItem {
    readonly id?: number;
    dropdownTemplateId: number;
    name: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    conditionaAction: ConditionalAction | null;
}

export interface DropdownTemplate {
    readonly id?: number;
    fnTemplateId: number | null;
    inputTemplateId: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    dropdownItems: DropdownItem[];
}

export interface CheckboxTemplate {
    readonly id?: number;
    inputTemplateId: number | null;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    conditionaAction: ConditionalAction | null;
}

export interface InputTemplate {
    readonly id?: number;
    name: string | null;
    type: InputType;
    lookUpId: number | null;
    taskTemplateId: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    dropdownTemplate?: DropdownTemplate;
    lookUpInputTemplates?: InputTemplate[];
    checkboxTemplates?: CheckboxTemplate[];
    conditionalAction?: ConditionalAction;
}

export interface FieldTemplate {
    readonly id?: number;
    name: string | null;
    description: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inputTemplates: InputTemplate[];
}

export interface FnTemplate {
    readonly id?: number;
    name: string | null;
    description: string | null;
    department: DepartmentType | null;
    isChoice: boolean;
    type: FnTemplateType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fieldTemplates: FieldTemplate[];
    dropdownTemplate?: DropdownTemplate;
    nextFollowUps: NextFollowUps[];
}

export default interface TaskTemplate {
    readonly id?: number;
    name: string | null;
    description: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fnTemplates?: FnTemplate[];
    metadataTemplates?: InputTemplate[];
}


export interface NextFollowUps {
    readonly id?: number;
    taskTemplateId: number | null;
    fnTemplateId: number | null;
    fieldTemplateId: number | null;
    inputTemplateId: number | null;
    conditionalActionId: number | null;
    targetedTaskTemplateId: number | null;
    targetedFnTemplateId: number | null;
    targetedInputTemplateId: number | null;
    targetedFieldTemplateId: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}