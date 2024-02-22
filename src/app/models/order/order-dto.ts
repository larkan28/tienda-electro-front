import { OrderProductDto } from "./order-product-dto";

export interface OrderDto {
    userId: number;
    addressId: number;
    payment: number;
    status: number;
    total: number;
    products: Array<OrderProductDto>;
}