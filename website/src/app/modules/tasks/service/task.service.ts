import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITask } from '../../../../app/models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public getAllTasks = (): Observable<ITask[]> => {
    return this.http.get<ITask[]>(`${environment.apiUrl}/tasks`);
  };

  public getTaskById = (id: number): Observable<ITask> => {
    return this.http.get<ITask>(`${environment.apiUrl}/tasks/${id}`);
  };

  public createTask = (task: ITask): Observable<any> => {
    return this.http.post(`${environment.apiUrl}/tasks/new`, task);
  };

  public updateTask = (id: number, task: ITask): Observable<ITask> => {
    return this.http.patch<ITask>(`${environment.apiUrl}/tasks/update/${id}`, task);
  };

  public deleteTask = (id: number): Observable<ITask> => {
    return this.http.delete<ITask>(`${environment.apiUrl}/tasks/delete/${id}`);
  };
}
