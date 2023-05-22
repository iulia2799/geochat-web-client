import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpResponse } from '@microsoft/signalr';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeUser: User = {
    email: 'iuliasarah27@gmail.com',
    password: 'admin1234'
  };

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string): Observable<any> {
    if(email === this.fakeUser.email && password === this.fakeUser.password) {
      localStorage.setItem("token", JSON.stringify(this.fakeUser));
      return of(new HttpResponse(200));
    } else {
      return of(new HttpResponse(401));
    }
  }

  registerUser(email: string, username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    const user = 
      {
        "email": email,
        "userName": username,
        "password": password,
        "passwordConfirmation": password
      }
    let result = "";
    this.http.post('https://geochatidentity.azurewebsites.net/api/Auth/register',user,httpOptions)
    .subscribe(
      (response) => {
        console.log('Success in creating the user');
        result = response.toString();
      },
      (error) => {
        console.log('error');
      }
    );
    return result !== "" ? of(new HttpResponse(200)) : of(new HttpResponse(401));
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    if(localStorage.getItem("token") != null) {
      return true;
    }

    return false;
  }

}
