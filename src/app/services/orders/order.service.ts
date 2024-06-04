import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder, User } from 'src/app/components/interfaces/IOrder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiUrl}/orders/orders/list`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users/user/list');
  }

  getOrder(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.apiUrl}/orders/order/${id}`);
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.apiUrl + '/orders/order/save', order);
  }

  updateOrder(id: number, order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.apiUrl}/orders/order/update/${id}`, order);
  }

  saveOrder(order: any, startTime: string, endTime: string, isRandomOrder: boolean): Observable<any> {
    let params = new HttpParams()
      .set('startTime', startTime)
      .set('endTime', endTime)
      .set('isRandomOrder', isRandomOrder.toString());
      
    return this.http.post(this.apiUrl + '/orders/order/save', order, { params });
  }
  
  

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/order/delete/${id}`);
  }
}
