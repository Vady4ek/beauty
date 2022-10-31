import { FormControl } from "@angular/forms";

type OrderFormFild = string | null;

export interface OrderForm {
    category?: OrderFormFild,
    service: OrderFormFild,
    master: OrderFormFild,
    date: OrderFormFild,
    time: OrderFormFild,
    endTime: OrderFormFild,
    currency: OrderFormFild,
    name: OrderFormFild,
    phone: OrderFormFild,
    email: OrderFormFild,
    comments?: OrderFormFild,
    price: OrderFormFild,
}

export interface OrderInfo {
    category?: OrderFormFild,
    service: OrderFormFild,
    master: OrderFormFild,
    date: OrderFormFild,
    time: OrderFormFild,
    endTime: OrderFormFild,
    price: OrderFormFild,
    currency: OrderFormFild,
}

export interface ClientInfo {
    name: OrderFormFild,
    phone: OrderFormFild,
    email: OrderFormFild,
    comments?: OrderFormFild,
}