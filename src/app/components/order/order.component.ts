import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/models/order.model';
import { Observable, of } from 'rxjs';
import {
  GridApi,
  ColumnApi,
  GridReadyEvent,
  SideBarDef,
  GetRowIdFunc,
  GetRowIdParams
} from 'ag-grid-community'
import { columnDefs, defaultColDef } from 'src/app/service/order.service.config';
import { OrdersGridFacadeService } from 'src/app/service/orders-grid-facade.service';
import { OrderFacadeService } from 'src/app/service/order.facade.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit{
  public gridApi!: GridApi
  public gridColumnApi!: ColumnApi;
  public rowData$: Observable<Order[]> | undefined;
  public tooltipShowDelay = 0;
  public isGridLoading = true;
  public sideBar: SideBarDef = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams : {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true
        }
      }
    ],
    defaultToolPanel: ''
  };

  public gridOptions : any = {
    columnDefs: columnDefs,
    defaultColDef: defaultColDef,
    suppressContextMenu: true,
    rowSelection: 'single',
    paginationAutoPageSize: true,
    sideBar: this.sideBar,
    detailRowHeight: true,
    tooltipMouseTrack: true,
    onGridReady: (event: GridReadyEvent): void => this.onGridReady(event)
  };

  public webSocketOrderService! : OrderService;
  public constructor(
    private readonly orderFacadeService : OrderFacadeService,
    private readonly orderGridFacadeService: OrdersGridFacadeService,
    public auth: AuthService) 
  { 
      this.rowData$ = orderGridFacadeService.orders$;
  }
 
  ngOnInit(): void {
   this.webSocketOrderService = new OrderService(this.orderFacadeService, this.auth);
   this.webSocketOrderService.initializeWebSocketConnection();
  }
  
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => 
  (params.data as Order).orderId.toString();

  public onGridReady(gridOptions: GridReadyEvent): void {
    this.gridApi = gridOptions.api;
    this.gridColumnApi = gridOptions.columnApi;
    this.isGridLoading = false;
  }
}
