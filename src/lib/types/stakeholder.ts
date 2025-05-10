/**
 * Parent Company interface
 */
export interface ParentCompany {
    id: number;
    name: string;
    address?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    website?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Customer interface
 */
export interface Customer {
    id: number;
    parentCompanyId?: number;
    name: string;
    address?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    website?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Customer with parent company details
 */
export interface CustomerWithParent extends Customer {
    parentCompany?: ParentCompany;
}

/**
 * Customer creation/update data
 */
export interface CustomerFormData {
    parentCompanyId?: number;
    name: string;
    address?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    website?: string;
}

/**
 * Parent company creation/update data
 */
export interface ParentCompanyFormData {
    name: string;
    address?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    website?: string;
} 