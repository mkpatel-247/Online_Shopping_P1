import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router, private _location: Location, private authService: AuthService, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.router.navigate(['/home']);
      return;
    }
  }
  /**
   * getting form all controls
   */
  get fc() {
    return this.loginForm.controls;
  }

  handleLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.loggedInUser(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            localStorage.setItem('loginToken', res.token);
            localStorage.setItem('userDetail', JSON.stringify(res.data));
            this.authService.isLoggedIn.next(true);
            this.authService.userDetail.next(res.data);
            this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, "You've logged in successfully");
            this._location.back();
          }
        },
        error: (err: any) => {
          this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Email or Password is Invalid")

        }
      })
    }
  }

}
