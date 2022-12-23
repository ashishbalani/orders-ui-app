import { ICellRendererParams } from "ag-grid-community";
import { Order } from "../models/order.model";

export const fieldName = (field: keyof Order): string => field.toString();
export function numberFormatter(params: ICellRendererParams): string {
    return Number(params.value ?? 0).toLocaleString('en',{
        maximumFractionDigits: 2
    })
}
export const valueComparator = (
    quantity1: string,
    quantity2: string
): number => {
    //Replaces $ character and all ouccurences of comma(,) in a string formatted amount deciaml value. 
    const value1 = Number.parseInt(quantity1.replace('$','').replace(/,/g,''))
    const value2 = Number.parseInt(quantity2.replace('$','').replace(/,/g,''))
    return value1 > value2 ? 1 : -1 
}