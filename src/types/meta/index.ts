import { TaskStatus, RoleType, DepartmentType, PermissionType } from "../enums";


export const RoleMeta: Record<RoleType, { label: string; className: string }> = {
    ADMIN: { label: "Admin", className: "bg-red-600 text-white" },
    OPERATOR: { label: "Operator", className: "bg-blue-500 text-white" },
    SALES: { label: "Sales", className: "bg-orange-500 text-white" },
    MARKETING: { label: "Marketing", className: "bg-pink-500 text-white" },
    ACCOUNTS: { label: "Accounts", className: "bg-green-600 text-white" },
    DISPATCH: { label: "Dispatch", className: "bg-yellow-400 text-black" },
    TECHNICIAN: { label: "Technician", className: "bg-cyan-600 text-white" },
    SURVEYOR: { label: "Surveyor", className: "bg-purple-500 text-white" },
    MEMBER: { label: "Member", className: "bg-gray-500 text-white" },
};

export const PermissionMeta: Record<PermissionType, { label: string; className: string }> = {
    CREATE: { label: "Create", className: "bg-green-500 text-white" },
    READ: { label: "Read", className: "bg-blue-500 text-white" },
    UPDATE: { label: "Update", className: "bg-yellow-500 text-black" },
    DELETE: { label: "Delete", className: "bg-red-500 text-white" },
};

export const DepartmentMeta: Record<DepartmentType, { label: string; className: string }> = {
    QUOTATION: { label: "Quotation", className: "bg-blue-500 text-white" },
    ACCOUNTS: { label: "Accounts", className: "bg-green-600 text-white" },
    DISPATCH: { label: "Dispatch", className: "bg-yellow-400 text-black" },
    SERVICE: { label: "Service", className: "bg-cyan-500 text-white" },
    CUSTOMER: { label: "Customer", className: "bg-purple-500 text-white" },
    WORKSHOP: { label: "Workshop", className: "bg-red-500 text-white" },
};

export const TaskStatusMeta: Record<TaskStatus, { label: string; className: string }> = {
    PENDING: { label: "Pending", className: "bg-gray-400 text-white" },
    IN_PROGRESS: { label: "In Progress", className: "bg-blue-500 text-white" },
    COMPLETED: { label: "Completed", className: "bg-green-500 text-white" },
    CANCELLED: { label: "Cancelled", className: "bg-red-500 text-white" },
    ON_HOLD: { label: "On Hold", className: "bg-yellow-400 text-black" },
    REJECTED: { label: "Rejected", className: "bg-pink-500 text-white" },
};
