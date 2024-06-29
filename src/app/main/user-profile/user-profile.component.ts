import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductListComponent } from '../product-list/product-list.component';
import { isEmailValid } from 'src/app/shared/validators/custom.validator';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProductListComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  userProfileForm = new FormGroup({
    image: new FormControl(''),
    firstName: new FormControl('Dhvani', [Validators.required]),
    lastName: new FormControl('Patel', [Validators.required]),
    phone : new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    email: new FormControl('k.anderson@example.com', [Validators.required, isEmailValid()]),
    password: new FormControl('asdfasdfasdf', [Validators.required])
  })
  showPassword: boolean = false;
  submitted: boolean = false;
  profileImage: any;

  /**
   * getting form all controls
   */
  get fc() {
    return this.userProfileForm.controls;
  }

  /**
   * set the profile image as preview
   * @param event Event
   */
  getProfilePhoto(event: any) {

    if (event.target.files[0].size > 2097152) {
      alert("File is too big!");
    }
    else {

      let reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * removes the profile pic
   */
  removeProfile() {
    this.profileImage = ''
    this.userProfileForm.patchValue({ image: '' })

  }
  handleSubmit() {
    this.submitted = true

    if (this.userProfileForm.valid) {

    }
  }

}