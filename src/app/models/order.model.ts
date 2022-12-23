export class Order {
    public orderId: number;
    public parentId: number;
    public price: string;
    public executedQuantity: number;
    public quantity: number;
    public security: string;
    
    public constructor(order: Order) {
        this.orderId = order.orderId;
        this.parentId = order.parentId;
        this.price = order.price;
        this.executedQuantity = order.executedQuantity;
        this.quantity = order.quantity;
        this.security = order.security;
    }
}