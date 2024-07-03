import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { isEmailValid } from 'src/app/shared/validators/custom.validator';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.router.navigate(['/home']);
      return;
    }
  }
  forgotPassForm = new FormGroup({
    email: new FormControl('', [Validators.required, isEmailValid()]),
  });
  submitted: boolean = false;

  /**
   * 
   */
  handleSubmit() {
    this.submitted = true;
  }
}
