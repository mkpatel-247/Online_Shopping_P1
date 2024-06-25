import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid } from 'src/app/shared/validators/isEmailValid.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, isEmailValid()]),
    password: new FormControl('', [Validators.required])
  });
  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router,) { }

  ngOnInit(): void {
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
    }
  }

}
