import { ColDef } from "ag-grid-community";
import { fieldName, numberFormatter, valueComparator } from "../util/order-grid-util";

export const defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    flex:1,
}

export const columnDefs: ColDef[] = [
    {
        headerName: 'Symbol',
        field: fieldName('security'),
        cellRenderer: 'agGroupCellRenderer',
        minWidth: 120,
        maxWidth: 120,
    },
    {
        headerName: 'Order Id',
        field: fieldName('orderId')
    },
    {
        headerName: 'Parent Id',
        field: fieldName('parentId')
    },
    {
        headerName: 'Price',
        field: fieldName('price'),
        cellRenderer: numberFormatter,
        comparator: valueComparator,
        type: 'rightAligned',
        minWidth: 120
    },
    {
        headerName: 'Quantity',
        field: fieldName('quantity'),
        cellRenderer: numberFormatter,
        type: 'rightAligned'
    },
    {
        headerName: 'Executed Quantity',
        field: fieldName('executedQuantity'),
        cellRenderer: numberFormatter,
        type: 'rightAligned'
    }

    
]