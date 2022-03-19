import { HttpClient  } from '@angular/common/http' ;
import { Injectable  } from '@angular/core' ;
import { Subject  } from 'rxjs' ;
import { ProductOrder} from '../models/product-order' ;
import { ProductOrders} from '../models/product-orders' ;

const baseURL = 'http://localhost:8081/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private productOrder: ProductOrder | undefined;
  private orders: ProductOrders = new ProductOrders();

  private productOrdersSubject = new Subject();
  private orderSubject = new Subject();
  private totalSubject = new Subject();

  private total: number = 0;

  ProductOrderChanged = this.productOrdersSubject.asObservable();
  OrdersChanged = this.orderSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) { }

  saveOrder(order: ProductOrders){
    return this.http.post(`${baseURL}/orders`, order);
  }

  set SelectedProductOrder(value: ProductOrder){
    this.productOrder = value;
    this.productOrdersSubject.next(this.productOrder);
  }

  get SelectedProductOrder(){
    return this.productOrder!;
  }

  set ProductOrders(value: ProductOrders){
    this.orders = value;
    this.orderSubject.next(this.orders);
  }

  get ProductOrders(){
    return this.orders;
  }

  set Total(value: number){
    this.total = value;
    this.totalSubject.next(this.total);
  }
  
  get Total(){
    return this.total;
  }
}
