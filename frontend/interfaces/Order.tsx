import { MenuItem } from "./MenuItem"
import { OrderPricing } from "./OrderPricing";

export enum Status {
    incomplete,
    unpaid,
    paid,
    outForDeliver,
    complete,
    refunded,
}

export interface Order {
    id: String;
    menuItems: MenuItem[];
    priceData: OrderPricing;
    orderStatus: Status;
    maker: String;
}