import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';  // Mock API base URL

  constructor(private http: HttpClient) {}

  // Login API
  login(credentials: any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, {
      params: {
        username: credentials.username,
        password: credentials.password
      }
    }).pipe(
      map(users => {
        const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
        return user ? { success: true, user } : { success: false };
      }),
      catchError(() => of({ success: false }))
    );
  }

  // Signup API (add user)
  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user).pipe(
      map((response) => {
        return { success: true, response };
      }),
      catchError(() => of({ success: false }))
    );
  }

  // Fetch Dashboard Data
  getDashboardData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`).pipe(
      catchError(() => of([]))  // Return an empty array if there's an error
    );
  }

  // Fetch Report Data
  getReportData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/report`).pipe(
      catchError(() => of([]))  // Return an empty array if there's an error
    );
  }
}
