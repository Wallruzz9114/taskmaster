import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../../../app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getAllUsers = (): Observable<IUser[]> => {
    return this.http.get<IUser[]>(`${environment.apiUrl}/users`);
  };

  public getUserById = (id: number): Observable<IUser> => {
    return this.http.get<IUser>(`${environment.apiUrl}/users/${id}`);
  };
}
