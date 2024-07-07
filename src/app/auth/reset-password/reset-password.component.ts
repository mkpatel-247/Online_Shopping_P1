import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPasswordStrong } from 'src/app/shared/validators/custom.validator';
import { CommonService } from 'src/app/shared/service/common.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userToken: any;
  isPasswordEqual: boolean = false;
  resetPassForm = new FormGroup({
    password: new FormControl('', [Validators.required, isPasswordStrong()]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  submitted: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private toastService: ToastMessageService, private commonService: CommonService, private authService: AuthService) { }
  showPassword: boolean = false;

  ngOnInit() {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.router.navigate(['/home']);
      return;
    }
    this.userToken = this.route.snapshot.params['token']
    this.commonService.breadCrumb.next([]);
  }


  /**
   * update the user password
   */
  handleSubmit() {
    this.submitted = true;
    if (this.resetPassForm.valid) {
      if (this.resetPassForm.value.password !== this.resetPassForm.value.confirmPassword) {
        this.isPasswordEqual = true;
      } else {
        this.isPasswordEqual = false;
        this.authService.resetPassword(this.userToken, this.resetPassForm.value).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
            }
          },
          error: (err: any) => {
            this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, 'Error Occurred');
          }
        })
      }
    }
  }
}
