export interface AddressDTO {
    _id?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}