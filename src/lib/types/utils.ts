/**
 * API response wrapper type
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
}

/**
 * Filter parameters type
 */
export interface FilterParams {
    [key: string]: string | number | boolean | undefined;
}

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Sort parameters
 */
export interface SortParams {
    field: string;
    direction: SortDirection;
}

/**
 * Query parameters for data fetching
 */
export interface QueryParams {
    page?: number;
    pageSize?: number;
    filters?: FilterParams;
    sort?: SortParams;
    search?: string;
}

/**
 * Notification interface
 */
export interface Notification {
    id: number;
    userId: number;
    title: string;
    message: string;
    isRead: boolean;
    link?: string;
    createdAt: string | Date;
} 