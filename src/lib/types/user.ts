import { DepartmentType, PermissionType, RoleType } from "./enums";

/**
 * Base User interface
 */
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    profileImage?: string;
    isAdmin: boolean;
    disabled: boolean;
    refreshToken?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Permission interface
 */
export interface Permission {
    id: number;
    name: string;
    description?: string;
    type: PermissionType;
    roleId: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Role interface
 */
export interface Role {
    id: number;
    name: string;
    description?: string;
    type: RoleType;
    departmentId: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Department interface
 */
export interface Department {
    id: number;
    name: string;
    description?: string;
    type: DepartmentType;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * RoleWithPermissions interface
 */
export interface RoleWithPermissions extends Role {
    permissions: Permission[];
}

/**
 * DepartmentWithRoles interface
 */
export interface DepartmentWithRoles extends Department {
    roles: RoleWithPermissions[];
}

/**
 * UserWithDepartments interface - for complete user data
 */
export interface UserWithDepartments extends User {
    departments: DepartmentWithRoles[];
}

/**
 * Auth response data interface
 */
export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * Registration data interface
 */
export interface RegistrationData {
    name: string;
    email: string;
    password: string;
    phone: string;
} 