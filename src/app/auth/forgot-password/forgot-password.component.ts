import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotPassForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });
  submitted: boolean = false;

  /**
   * 
   */
  handleSubmit() {
    this.submitted = true;
    if (this.forgotPassForm.valid) {
      
    }
  }
}
