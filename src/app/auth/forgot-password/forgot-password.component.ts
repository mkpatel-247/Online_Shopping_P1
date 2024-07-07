import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { isEmailValid } from 'src/app/shared/validators/custom.validator';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private commonService: CommonService, private toastService: ToastMessageService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.router.navigate(['/home']);
      return;
    }
    this.commonService.breadCrumb.next([]);
  }
  forgotPassForm = new FormGroup({
    email: new FormControl('', [Validators.required, isEmailValid()]),
  });
  submitted: boolean = false;

  /**
   * redirect to change the password with token
   */
  handleSubmit() {
    this.submitted = true;

    if (this.forgotPassForm.valid) {

      this.authService.forgotPassword(this.forgotPassForm.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.router.navigate([`/auth/reset-password/${res.token}`]);
          }
        },
        error: (err: any) => {
          this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, err.error.message);
        }
      })
    }
  }
}
