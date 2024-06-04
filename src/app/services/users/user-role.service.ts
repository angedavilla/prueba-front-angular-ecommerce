import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IUserRole } from 'src/app/components/interfaces/IUserRole';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUserRole[]> {
    return this.http.get<IUserRole[]>(this.apiUrl + '/users/user/list');
  }

  getUserRoles(username: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/users/${username}/roles`);
  }

  addUserRole(username: string, roleName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/${username}/roles/${roleName}`, {})
    .pipe(
      catchError(this.handleError<any>('removeUserRole'))
    );;
  }

  removeUserRole(username: string, roleName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${username}/roles/${roleName}`);
  }

  changeUserRole(username: string, oldRoleName: string, newRoleName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}/roles?oldRoleName=${oldRoleName}&newRoleName=${newRoleName}`, {})
      .pipe(
        catchError(this.handleError<any>('changeUserRole'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
