import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid } from 'src/app/shared/validators/isEmailValid.validator';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  userProfileForm = new FormGroup({
    userName: new FormControl('Dhvani', [Validators.required]),
    email: new FormControl('k.anderson@example.com', [Validators.required, isEmailValid()]),
    password: new FormControl('asdfasdfasdf', [Validators.required])
  })
  showPassword: boolean = false;
  submitted: boolean = false;

  handleSubmit() {
    this.submitted = true

    if (this.userProfileForm.valid) {

    }
  }

}
