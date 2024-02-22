export interface Order {
    id: number;
    userId: number;
    addressId: number;
    payment: number;
    status: number;
    total: number;
    createdTime: Date;
}