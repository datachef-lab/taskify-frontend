export enum PermissionType {
    "CREATE" = "CREATE",
    "READ" = "READ",
    "UPDATE" = "UPDATE",
    "DELETE" = "DELETE"
}

export enum RoleType {
    "ADMIN" = "ADMIN",
    "OPERATOR" = "OPERATOR",
    "SALES" = "SALES",
    "MARKETING" = "MARKETING",
    "ACCOUNTS" = "ACCOUNTS",
    "DISPATCH" = "DISPATCH",
    "TECHNICIAN" = "TECHNICIAN",
    "SURVEYOR" = "SURVEYOR",
    "MEMBER" = "MEMBER"
}

export enum DepartmentType {
    "QUOTATION" = "QUOTATION",
    "ACCOUNTS" = "ACCOUNTS",
    "DISPATCH" = "DISPATCH",
    "SERVICE" = "SERVICE",
    "CUSTOMER" = "CUSTOMER",
    "WORKSHOP" = "WORKSHOP"
}

export enum InputType {
    "FILE" = "FILE",
    "MULTIPLE_FILES" = "MULTIPLE_FILES",
    "TEXT" = "TEXT",
    "TEXTAREA" = "TEXTAREA",
    "NUMBER" = "NUMBER",
    "EMAIL" = "EMAIL",
    "PHONE" = "PHONE",
    "DROPDOWN" = "DROPDOWN",
    "AMOUNT" = "AMOUNT",
    "TABLE" = "TABLE",
    "CHECKBOX" = "CHECKBOX",
    "DATE" = "DATE",
    "BOOLEAN" = "BOOLEAN",
    "RICH_TEXT_EDITOR" = "RICH_TEXT_EDITOR",
    "LOOK_UPS" = "LOOK_UPS",
}

export enum ConditionType {
    "EQUALS" = "EQUALS",
    "LESS_THAN" = "LESS_THAN",
    "LESS_THAN_EQUALS" = "LESS_THAN_EQUALS",
    "GREATER_THAN" = "GREATER_THAN",
    "GREATER_THAN_EQUALS" = "GREATER_THAN_EQUALS"
}

export enum ConditionalActionType {
    "MARK_TASK_AS_DONE" = "MARK_TASK_AS_DONE",
    "MARK_FN_AS_DONE" = "MARK_FN_AS_DONE",
    "MARK_FIELD_AS_DONE" = "MARK_FIELD_AS_DONE",
    "NOTIFY_USERS" = "NOTIFY_USERS",
    "ADD_DYNAMIC_INPUT" = "ADD_DYNAMIC_INPUT",
    // "ADD_DATA" = "ADD_DATA"
}

export enum FnTemplateType {
    "NORMAL" = "NORMAL",
    "SPECIAL" = "SPECIAL"
}

export enum TaskStatus {
    "PENDING" = "PENDING",
    "IN_PROGRESS" = "IN_PROGRESS",
    "COMPLETED" = "COMPLETED",
    "CANCELLED" = "CANCELLED",
    "ON_HOLD" = "ON_HOLD",
    "REJECTED" = "REJECTED"
}

export enum PriorityType {
    "NORMAL" = "NORMAL",
    "MEDIUM" = "MEDIUM",
    "HIGH" = "HIGH"
}
