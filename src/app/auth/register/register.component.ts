import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid } from 'src/app/shared/validators/isEmailValid.validator';
import { isPasswordStrong } from 'src/app/shared/validators/isPasswordStrong.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, isEmailValid()]),
    password: new FormControl('', [Validators.required, isPasswordStrong()])
  });
  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  /**
   * getting form all controls
   */
  get fc() {
    return this.registrationForm.controls;
  }

  handleLogin() {
    this.submitted = true;

    if (this.registrationForm.valid) {
    }
  }
}
