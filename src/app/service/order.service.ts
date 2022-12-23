import { Injectable } from '@angular/core';
import config from '../../../config/socket_config.json'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { OrderFacadeService } from './order.facade.service';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly orderFacadeService: OrderFacadeService, 
    private auth:AuthService) { 
    setInterval(() => this.updateOrders(), 1000)    
  }
  public stompClient: any;
  public orders: Observable<Array<Order>> | undefined;
 
  public batchOrders: Order[] = [];
  public updateOrders(): void {
    if(this.batchOrders.length > 0) {
      this.orderFacadeService.updateOrders(this.batchOrders);
      this.batchOrders = []
    }
  }

  public initializeWebSocketConnection() {
    const ws = new SockJS(config.endpoint);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect(
      {authorization: this.getToken(), login: this.getUserEmail() },
      () => {
        this.stompClient.subscribe(config.topic, (data: Stomp.Message)=> {
          this.onOrdersReceived(data);
        });
      }
    )

  }
  public onOrdersReceived(data: Stomp.Message) {
      const orders: Order[] = JSON.parse(data.body) as Order[];
      this.batchOrders = [...this.batchOrders, ...orders];
  }

  public readonly getToken = () : string => { 
    let result: string = '';
    if(localStorage.getItem('token')!=null) {
      result = String(localStorage.getItem('token'));
    } else {
      this.auth.getAccessTokenSilently((token:any)=>{
        result = token.authorized_token;
        localStorage.setItem('token', result);
      });
    }
    return result;
  }

  public readonly getUserEmail = () : string => {
    return String(localStorage.getItem('user-email'))
  }


  
}
