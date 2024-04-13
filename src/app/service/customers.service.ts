import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../class/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  private apiUrl = 'https://localhost:7087/api/Registration';
  // private readonly apiUrl = 'https://webshopfilimon.azurewebsites.net/api/Customer';
  constructor(private http: HttpClient) { }

  

     getAllUsers(): Observable<UserRegistration[]> {
      const url = `${this.apiUrl}/get-all-users/`;
      const observable = this.http.get<UserRegistration[]>(`${this.apiUrl}/get-all-users`);
      observable.subscribe({
        next: users => {
         console.log(users)
        },
        error: error => {
          console.error('Error getting categories: ', error);
        }
      });
    
      return observable;
    }

    approveUser(userId: string): Observable<any> {
      console.log("useridapprove", userId)
      return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {});
  }
  
  rejectUser(userId: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/reject-user/${userId}`, {});
  }
  

}
