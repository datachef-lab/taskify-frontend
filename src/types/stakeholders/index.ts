export interface PersonOfContact {
    readonly id?: number;
    parentCompany: number | null;
    customerId: number | null;
    name: string;
    email: string | null;
    address: string;
    state: string;
    city: string;
    pincode: string;
    phone: string;
    residentialAddress: string;
    birthDate: string | null | Date;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Customer {
    readonly id?: number;
    parentCompanyId?: number;
    name: string;
    email: string | null;
    address: string;
    state: string;
    city: string;
    pincode: string;
    phone: string;
    gst: string | null;
    pan: string | null;
    residentialAddress: string;
    birthDate: string | null | Date;
    anniversaryDate: string | null | Date;
    oldCustomerId: number;
    parentCompany: number | null;
    personOfContacts: PersonOfContact[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface ParentCompany {
    readonly id?: number;
    name: string,
    email: string | null,
    address: string | null;
    state: string | null;
    city: string | null;
    pincode: string | null;

    phone: string | null;
    businessType: string | null;
    headOfficeAddress: string | null;
    remarks: string | null;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
}