import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpResponse } from '@microsoft/signalr';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string): Observable<any> {
    var result: Observable<any> = of(null);
    const url = 'https://geochatidentity.azurewebsites.net/api/Auth/login';
    const payload = {
      email: 'iuliasarah27@gmail.com',
      password: 'S$432ffss4#'
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '/'
      })
    };

    this.http.post(url, payload, httpOptions)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          result = of(new HttpResponse(200));
        },
        (error) => {
          console.log('An error occurred during login:', error);
          result = of(new HttpResponse(400));
        }
      );
    return result;
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
        console.log(response)
      },
      (error) => {
        console.log('error');
      }
    );
    return of(new HttpResponse(200));
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
