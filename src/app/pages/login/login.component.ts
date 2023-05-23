import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';
import { AuthService, UsersService } from 'src/app/identityApi/services';
import { UserLoginDto } from 'src/app/identityApi/models';
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
import jwtDecode from 'jwt-decode';

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
  loginToken!: string;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: [''],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });



  isOpen: boolean = true;  
  stringifiedBody: unknown;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _matSnackBar: MatSnackBar,
    private usersService: UsersService) {
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
        var user : UserLoginDto = {
            email: email,
            password: password
        };

        if(this.isOpen) {
          var response = this.authService.apiAuthLoginPost$Json$Response({body: user}).pipe().subscribe(
            response => {
              console.log(response)
              this.loginToken = response.body;
              const decodedToken = jwtDecode(this.loginToken);
              localStorage.setItem('userInfo',JSON.stringify(decodedToken));
              localStorage.setItem('token', JSON.stringify(response.body));
              this.router.navigateByUrl('main-page');
            }, (error) => {
              console.error(error)
              this._matSnackBar.open('Invalid credentials','OK',{
                       duration: 2000,
                     });
            }
          );
          setTimeout(() => {
            console.log(this.loginToken)
          }, 1000);

          //this.authService.authenticate(email,password).subscribe(response => {
        //   if(response.statusCode === 401) {
        //     this._matSnackBar.open('Invalid credentials','OK',{
        //       duration: 2000,
        //     });
        //   } else {
        //     this.router.navigateByUrl('main-page');
        //   }
        // });
        }
        else {
        //   this.authService.registerUser(email,this.loginForm.get('username')?.value,password).subscribe(
        //     response => {
        //       if(response.statusCode === 401) {
        //         this._matSnackBar.open('Something went wrong','OK',{
        //           duration: 2000,
        //         });
        //       } else {
        //         this._matSnackBar.open('Registering was a success. Please log in with the provided credentials.','OK',{
        //           duration: 10000,
        //         });
        //       }
        //     }
        //   )
        }
      }
    }
  }
}
