import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'ctt-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = true;

  

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
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
}
