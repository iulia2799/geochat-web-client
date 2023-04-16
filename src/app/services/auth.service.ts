import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpResponse } from '@microsoft/signalr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeUser: User = {
    email: 'iuliasarah27@gmail.com',
    password: 'admin1234'
  };

  constructor() { }

  authenticate(email: string, password: string): Observable<any> {
    if(email === this.fakeUser.email && password === this.fakeUser.password) {
      localStorage.setItem("token", JSON.stringify(this.fakeUser));
      return of(new HttpResponse(200));
    } else {
      return of(new HttpResponse(401));
    }
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
