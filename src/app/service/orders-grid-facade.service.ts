import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { OrderGridState } from "../state/order.reducer";
import { getAllOrders, getOrdersTooltipStrategy } from "../state/orders.selctors";

@Injectable({
    providedIn: 'root'
})
export class OrdersGridFacadeService {
    public constructor(
        private readonly store: Store<OrderGridState>
    ){}
    public orders$ = this.store.select(getAllOrders);
    public tooltipData$ = this.store.select(getOrdersTooltipStrategy);
}