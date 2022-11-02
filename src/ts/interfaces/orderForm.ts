import { FormControl } from "@angular/forms";

type TextField = string | null;
type DigitField = number | null;

export interface OrderForm {
    category?: TextField,
    service: TextField,
    master: TextField,
    date: TextField,
    time: TextField,
    endTime: TextField,
    currency: TextField,
    name: TextField,
    phone: TextField,
    email: TextField,
    comments?: TextField,
    price: TextField,
}

export interface OrderInfo {
    category?: TextField,
    service: TextField,
    master: TextField,
    date: TextField,
    time: TextField,
    endTime: TextField,
    price: TextField,
    currency: TextField,
}

export interface ClientInfo {
    name: TextField,
    phone: TextField,
    email: TextField,
    comments?: TextField,
}