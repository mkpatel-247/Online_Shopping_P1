import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPasswordStrong } from 'src/app/shared/validators/isPasswordStrong.validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetPassForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required, isPasswordStrong()])
  });
  submitted: boolean = false;
  showPassword: boolean = false;

  /**
   * 
   */
  handleSubmit() {
    this.submitted = true;
    if (this.resetPassForm.valid) {

    }
  }
}
