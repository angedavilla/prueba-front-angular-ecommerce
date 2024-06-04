import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRole } from 'src/app/components/interfaces/IRoles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<IRole[]> {
    return this.http.get<any[]>(this.apiUrl + '/roles/role/list');
  }

  getRole(id: number): Observable<IRole> {
    return this.http.get<IRole>(`${this.apiUrl}/roles/role/${id}`);
  }

  createRole(role: IRole): Observable<IRole> {
    return this.http.post<IRole>(this.apiUrl + '/roles/role/register', role);
  }

  updateRole(id: number, role: IRole): Observable<IRole> {
    return this.http.put<IRole>(`${this.apiUrl}/roles/role/update/${id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/roles/role/delete/${id}`);
  }
}
