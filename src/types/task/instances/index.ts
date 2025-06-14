import { PriorityType, TaskStatus } from "@/types/enums";


export interface TableCellInstance {
    readonly id?: number;
    tableRowInstanceId: number | null;
    tableColumnInstanceId: number | null;
    value: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;

}

export interface TableRowInstance {
    readonly id?: number;
    inputInstanceId: number | null;
    rowIndex: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cells: TableCellInstance[];
}

export interface CheckboxInstance {
    readonly id?: number;
    checkboxTemplateId: number | null;
    checked: boolean;
    inputInstanceId: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;

}

export interface TableColumnInstance {
    readonly id?: number;
    inputInstanceId: number | null;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface FileScan {
    filePath: string;
    originalName: string;
    savedName: string;
    uploadedAt: Date | string;
}

export interface InputInstance {
    readonly id?: number;
    inputTemplateId: number | null;
    taskInstanceId: number | null;
    fieldInstanceId: number | null;
    dropdownItemId: number | null;
    numberValue: number | null;
    booleanValue: boolean;
    dateValue: Date | string | null;
    textValue: string | null;
    isDynamicallyCreated: boolean;
    triggeringConditionalActionId: number | null;
    createdById: number;
    updatedById: number;
    remarks: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    checkboxInstances: CheckboxInstance[] | null;
    table: {
        headers: TableColumnInstance[];
        rows: TableRowInstance[];
    } | null;
    files?: File[];
    scannedFiles?: FileScan[];
}

export interface FieldInstance {
    readonly id?: number;
    fieldTemplateId: number;
    fnInstanceId: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    inputInstances: InputInstance[];
}

export interface FnInstance {
    readonly id?: number;
    fnTemplateId: number;
    taskInstanceId: number;
    dropdownItemId: number | null;
    remarks: string | null;
    createdById: number;
    assigneeId: number;
    closedById: number | null;

    createdAt?: Date | string;
    updatedAt?: Date | string;
    fieldInstances: FieldInstance[];
    files?: File[];
    scannedFiles?: FileScan[];
}

export interface TaskInstance {
    readonly id?: number;
    taskTemplateId: number;
    code: string;
    customerId: number | null;
    priority: PriorityType;
    createdById: number;
    assigneeId: number;
    closedById: number | null;
    isArchived: boolean;
    status: TaskStatus;
    remarks: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    metadataInstances: InputInstance[];
    fnInstances: FnInstance[];
}
