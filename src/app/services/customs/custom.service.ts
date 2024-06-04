import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getActiveProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/custom/active-products`);
  }

  getTopSellingProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/custom/top-selling-products`);
  }

  getFrequentCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/custom/frequent-customers`);
  }
}
