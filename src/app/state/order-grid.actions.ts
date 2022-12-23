import { createAction, props } from "@ngrx/store";
import { OrderGridConstants } from "../constants/order-grid.constants";
import { Order } from "../models/order.model";

export const setTooltipStrategy = createAction(
    `${OrderGridConstants.ActionKey} ${OrderGridConstants.TooltipStrategy}`,
    props<{strategy: string}>() 
);

export const updateOrders = createAction(
    `${OrderGridConstants.ActionKey} ${OrderGridConstants.UpdateOrders}`,
    props<{orders: Order[]}>()
);