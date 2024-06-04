import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IOrderItem } from 'src/app/components/interfaces/IOrderItem';
import { IProductItem } from 'src/app/components/interfaces/IProductItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrderItems(): Observable<IOrderItem[]> {
    return this.http.get<IOrderItem[]>(`${this.apiUrl}/order-items/order-items/list`);
  }

  getProducts(): Observable<IProductItem[]> {
    return this.http.get<IProductItem[]>(`${this.apiUrl}/products/products/list`);
  }

  getOrderItem(id: number): Observable<IOrderItem> {
    return this.http.get<IOrderItem>(`${this.apiUrl}/order-items/order-item/${id}`);
  }

  createOrderItem(orderItem: IOrderItem): Observable<IOrderItem> {
    return this.http.post<IOrderItem>(`${this.apiUrl}/order-items/order-item/save`, orderItem)
    .pipe(catchError(this.handleError));;
  }

  updateOrderItem(id: number, orderItem: IOrderItem): Observable<IOrderItem> {
    return this.http.put<IOrderItem>(`${this.apiUrl}/order-items/order-item/update/${id}`, orderItem)
    .pipe(catchError(this.handleError));
  }

  deleteOrderItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/order-items/order-item/delete/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized! Please log in.';
          break;
        case 409:
          errorMessage = 'Not enough inventory!';
          break;
        case 404:
          errorMessage = `Error: ${error.error.message}`;
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          break;
      }
    }
    return throwError(errorMessage);
  }
}
