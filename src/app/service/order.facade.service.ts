import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Order } from "../models/order.model";
import { updateOrders } from "../state/order-grid.actions";

@Injectable({
    providedIn: 'root'
})
export class OrderFacadeService {
    constructor(private readonly store: Store){}
    public updateOrders(orders: Order[]): void {
        return this.store.dispatch(updateOrders({orders}));

    }
}