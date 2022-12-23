import {Action, createReducer, on} from '@ngrx/store';
import { Order } from '../models/order.model';
import * as OrderGridAction from './order-grid.actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface OrderGridState extends EntityState<Order> {
    selectedId?: string | number;
    loaded: boolean;
    error?: string | null;
    strategy: string;
}

export const orderEntityAdapter: EntityAdapter<Order> = 
createEntityAdapter<Order>({
    selectId: (order: Order) => order.orderId
});

export const initialState: OrderGridState = 
    orderEntityAdapter.getInitialState({
        loaded: false,
        strategy: ''
    });


export const orderReducer = createReducer(
    initialState,
    on(OrderGridAction.setTooltipStrategy, (state, { strategy}) =>({
    ...state,
      strategy
    })),
    on(OrderGridAction.updateOrders, (state, {orders}) => orderEntityAdapter.upsertMany(orders, state))
  );

export function reducer(
    state: OrderGridState | undefined,
    action: Action) : OrderGridState {
        return orderReducer(state, action);
    }