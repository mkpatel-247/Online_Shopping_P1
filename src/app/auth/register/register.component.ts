import { Component } from '@angular/core';
import { CommonModule, ɵparseCookieValue } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid, isPasswordStrong } from 'src/app/shared/validators/custom.validator';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, isEmailValid()]),
    password: new FormControl('', [Validators.required, isPasswordStrong()]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]),
  });
  submitted: boolean = false;
  showPassword: boolean = false;
  constructor(private router: Router, private authService: AuthService, private toastService: ToastMessageService) { }

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
    return this.registrationForm.controls;
  }

  handleSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      this.authService.registerUser(this.registrationForm.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, "Registration successful")
            localStorage.setItem('loginToken', res.token);
            this.router.navigate(['product'])
          }

        },
        error: (err: any) => {
          this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, err.error.message)
        }
      });
    }
  }
}
