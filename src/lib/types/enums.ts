/**
 * Permission type enum
 */
export enum PermissionType {
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    ALL = "ALL"
}

/**
 * Role type enum
 */
export enum RoleType {
    ADMIN = "ADMIN",
    OPERATOR = "OPERATOR",
    SALES = "SALES",
    MARKETING = "MARKETING",
    ACCOUNTS = "ACCOUNTS",
    DISPATCH = "DISPATCH",
    TECHNICIAN = "TECHNICIAN",
    SURVEYOR = "SURVEYOR",
    MEMBER = "MEMBER"
}

/**
 * Department type enum
 */
export enum DepartmentType {
    QUOTATION = "QUOTATION",
    ACCOUNTS = "ACCOUNTS",
    DISPATCH = "DISPATCH",
    SERVICE = "SERVICE",
    CUSTOMER = "CUSTOMER",
    WORKSHOP = "WORKSHOP"
}

/**
 * Function template type enum
 */
export enum FnTemplateType {
    NORMAL = "NORMAL",
    SPECIAL = "SPECIAL"
}

/**
 * Input type enum
 */
export enum InputType {
    FILE = "FILE",
    MULTIPLE_FILES = "MULTIPLE_FILES",
    TEXT = "TEXT",
    TEXTAREA = "TEXTAREA",
    NUMBER = "NUMBER",
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    DROPDOWN = "DROPDOWN",
    AMOUNT = "AMOUNT",
    TABLE = "TABLE",
    CHECKBOX = "CHECKBOX",
    DATE = "DATE",
    BOOLEAN = "BOOLEAN",
    RICH_TEXT_EDITOR = "RICH_TEXT_EDITOR"
}

/**
 * Condition type enum
 */
export enum ConditionType {
    EQUALS = "EQUALS",
    LESS_THAN = "LESS_THAN",
    LESS_THAN_EQUALS = "LESS_THAN_EQUALS",
    GREATER_THAN = "GREATER_THAN",
    GREATER_THAN_EQUALS = "GREATER_THAN_EQUALS"
}

/**
 * Conditional action type enum
 */
export enum ConditionalActionType {
    MARK_TASK_AS_DONE = "MARK_TASK_AS_DONE",
    MARK_FN_AS_DONE = "MARK_FN_AS_DONE",
    MARK_FIELD_AS_DONE = "MARK_FIELD_AS_DONE",
    NOTIFY_USERS = "NOTIFY_USERS",
    ADD_DYNAMIC_INPUT = "ADD_DYNAMIC_INPUT"
}

/**
 * Priority type enum
 */
export enum PriorityType {
    NORMAL = "NORMAL",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

/**
 * Task status enum
 */
export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    REJECTED = "REJECTED",
    ON_HOLD = "ON_HOLD",
    CANCELLED = "CANCELLED",
    REVISION_REQUIRED = "REVISION_REQUIRED"
}

/**
 * Reaction type enum
 */
export enum ReactionType {
    LIKE = "LIKE",
    DISLIKE = "DISLIKE",
    LOVE = "LOVE",
    LAUGH = "LAUGH",
    CELEBRATE = "CELEBRATE",
    SUPPORT = "SUPPORT",
    QUESTION = "QUESTION",
    IMPORTANT = "IMPORTANT"
}

/**
 * Notification type enum
 */
export enum NotificationType {
    NEW_COMMENT = "NEW_COMMENT",
    REPLY_TO_COMMENT = "REPLY_TO_COMMENT",
    COMMENT_REACTION = "COMMENT_REACTION",
    MENTION = "MENTION",
    TASK_ASSIGNED = "TASK_ASSIGNED",
    TASK_UPDATED = "TASK_UPDATED"
}

/**
 * Activity type enum (assuming from backend)
 */
export enum ActivityType {
    TASK_CREATED = "TASK_CREATED",
    TASK_UPDATED = "TASK_UPDATED",
    TASK_DELETED = "TASK_DELETED",
    TASK_ASSIGNED = "TASK_ASSIGNED",
    TASK_COMPLETED = "TASK_COMPLETED",
    COMMENT_ADDED = "COMMENT_ADDED",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

/**
 * Entity type enum (assuming from backend)
 */
export enum EntityType {
    TASK = "TASK",
    COMMENT = "COMMENT",
    USER = "USER",
    CUSTOMER = "CUSTOMER"
} 