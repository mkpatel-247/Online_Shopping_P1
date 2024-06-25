import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router,) { }

  ngOnInit(): void {
    // if (this.authService.getTokenFromLocalStorage()) {
    //   this.router.navigate(['/dashboard']);
    //   return;
    // }
  }
  /**
   * getting form all controls
   */
  get fc() {
    return this.loginForm.controls;
  }

  /**
   * store the user token to local storage and redirect to employee-list
   */
  handleLogin() {
    this.submitted = true;

    if (this.loginForm.valid) {
      // this.authService.onLogin(this.loginForm.value).subscribe({
      //   next: (res: any) => {
      //     this.toastService.showToast(TOAST_STATE.success, 'Login Successful');
      //     this.authService.setLoginToken(res)
      //     this.router.navigate(['/dashboard'])
      //   },
      //   error: (err: any) => {
      //     this.toastService.showToast(TOAST_STATE.danger, err.error.message);
      //   }
      // })
    }
  }

}
