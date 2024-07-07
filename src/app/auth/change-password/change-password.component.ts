import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPasswordStrong } from 'src/app/shared/validators/custom.validator';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent {

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, isPasswordStrong()]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  isPasswordEqual: boolean = false;
  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(public modal: NgbActiveModal, private toastService: ToastMessageService, private authService: AuthService, private cd: ChangeDetectorRef) { }

  /**
   * if valid change the password
   */
  handleSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.valid) {

      if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
        this.isPasswordEqual = true;
      } else {
        this.isPasswordEqual = false;
        this.authService.changePassword(this.changePasswordForm.value).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
              this.modal.close();
              this.cd.markForCheck();
            }
          },
          error: (err: HttpErrorResponse) => {
            this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Invalid Password.");
          }
        })
      }
    }
  }

}
