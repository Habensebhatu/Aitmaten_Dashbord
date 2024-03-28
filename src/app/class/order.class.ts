import { Product } from "./class";
import { OrderDetails } from "./orderDetails.class";


export class Order {
  orderId: number;
    customerId: number;
    products: Product[];
    orderDetails : OrderDetails[];
    dateOrdered: Date;
    status: string;
    total: number;
    recipientName: string;
    city : string;
    street : string;
    huisNumber : string;
    postalCode : string
    OrderNumber : number;
   

    constructor(orderInfo: any) {
      this.orderId = orderInfo.id;
      this.customerId = orderInfo.customerId;
      this.products = orderInfo.products;
      this.orderDetails = orderInfo.orderDetails;
      this.dateOrdered = new Date();
      this.status = orderInfo.status || 'pending';
      this.total = this.calculateTotal();
      this.recipientName = orderInfo.recipientName;
      this.city = orderInfo.city;
      this.postalCode = orderInfo.postalCode;
      this.OrderNumber = orderInfo.OrderNumber;
      this.street = orderInfo.street;
      this.huisNumber = orderInfo.huisNumber;
    

    }
  
    calculateTotal(): number {
      return this.products.reduce((total, product) => total + product.piecePrice, 0);
    }
  }
  