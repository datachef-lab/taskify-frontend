import { DepartmentType, PermissionType, RoleType } from "../enums";

export interface Permission {
    readonly id?: number;
    roleId: number;
    type: PermissionType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Role {
    readonly id?: number;
    departmentId: number;
    type: RoleType;
    permissions: Permission[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Department {
    readonly id?: number;
    userId: number;
    name: DepartmentType;
    roles: Role[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export default interface User {
    readonly id?: number;
    name: string;
    email: string;
    password?: string;
    phone: string;
    profileImage: string | null;
    isAdmin: boolean;
    disabled: boolean;
    departments: Department[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}