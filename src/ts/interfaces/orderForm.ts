import { FormControl } from "@angular/forms";

export interface OrderForm {
    category?: string,
    service: string,
    master: string,
    date: string,
    time: string,
    currency: string,
    name: string,
    phone: string,
    email: string,
    comments?: string,
}