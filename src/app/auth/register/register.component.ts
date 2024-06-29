import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid, isPasswordStrong } from 'src/app/shared/validators/custom.validator';

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
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
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

  handleSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
    }
  }
}
