import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/components/interfaces/IUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl + '/users/user/list');
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/users/user/${id}`);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl + '/auth/register', user);
  }

  updateUser(id: number, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/users/user/update/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/user/delete/${id}`);
  }
}
