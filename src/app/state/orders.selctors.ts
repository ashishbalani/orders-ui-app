import { createFeatureSelector, createSelector} from "@ngrx/store";
import { OrderGridConstants } from "../constants/order-grid.constants";
import { Order } from "../models/order.model";
import { orderEntityAdapter, OrderGridState } from "./order.reducer";

export const getOrderGridState = createFeatureSelector<OrderGridState>(
    OrderGridConstants.FeatureKey
)

const {selectAll} = orderEntityAdapter.getSelectors();

export const getOrdersLoaded = createSelector(
    getOrderGridState,
    (state: OrderGridState) => state.loaded
);

export const getOrdersError = createSelector(
    getOrderGridState,
    (state: OrderGridState) => state.error
);
export const getOrdersTooltipStrategy = createSelector(
    getOrderGridState,
    (state: OrderGridState) => state.strategy
);

export const getAllOrders = createSelector(
    getOrderGridState,
    (state: OrderGridState) => selectAll(state)
)