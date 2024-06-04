import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IInventory } from 'src/app/components/interfaces/IInvetory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getInventoryItems(): Observable<IInventory[]> {
    return this.http.get<IInventory[]>(this.apiUrl + '/inventory/inventories/list');
  }   

  getInventoryItem(id: number): Observable<IInventory> {
    return this.http.get<IInventory>(`${this.apiUrl}/inventory/inventory/${id}`);
  }

  createInventoryItem(item: IInventory): Observable<IInventory> {
    return this.http.post<IInventory>(this.apiUrl + '/inventory/inventory/save', item)
    .pipe(catchError(this.handleError));;
  }

  updateInventoryItem(id: number, item: IInventory): Observable<IInventory> {
    return this.http.put<IInventory>(`${this.apiUrl}/inventory/inventory/update/${id}`, item)
    .pipe(catchError(this.handleError));;
  }

  deleteInventoryItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inventory/inventory/delete/${id}`);
  }

  checkProductExists(productId: number, productName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/inventory/inventory/check-exists`, {
      params: { productId: productId.toString(), productName }
    });
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.status === 409) {
        errorMessage = 'Product already exists!';
      }
    }
    return throwError(errorMessage);
  }
}
