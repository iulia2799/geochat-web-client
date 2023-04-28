import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'ctt-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        //transform: 'translateX(0%)'
      })),
      state('closed', style({
        height: 0,
        opacity: 0,
        //transform: 'translateX(10%)'
      })),
      transition('open => closed', [
        animate('1s ease-out')
      ]),
      transition('closed => open', [
        animate('1s ease-in')
      ]),
    ]),
    trigger('closedOpen', [
      // ...
      state('closed', style({
        height: 0,
        opacity: 0,
        //transform: 'translateX(-50%)'
      })),
      state('open', style({
        opacity: 1,
        // transform: 'translateX(10%)'
      })),
      transition('open => closed', [
        animate('1s ease-out')
      ]),
      transition('closed => open', [
        animate('1s ease-in')
      ]),
    ]),
  ]
})
export class LoginComponent implements OnInit{
  hide: boolean = true;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: [''],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });



  isOpen: boolean = true;  

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  
  toggle() {
    this.isOpen = !this.isOpen;
  }


  onLogin() {
    console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      return;
    } else {
      if(this.loginForm.get('email')?.value !== null && this.loginForm.get('password')?.value !== null) {
        let email = this.loginForm.get('email')?.value;
        let password = this.loginForm.get('password')?.value;
        this.authService.authenticate(email,password).subscribe(response => {
          if(response.statusCode === 401) {
            this._matSnackBar.open('Invalid credentials','OK',{
              duration: 2000,
            });
          } else {
            this.router.navigateByUrl('main-page');
          }
        });
      }
    }
  }

  takeMeToRegister() {
    this.router.navigateByUrl(this.router.url + '/signup');
  }
}
