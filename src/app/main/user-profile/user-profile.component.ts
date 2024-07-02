import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid } from 'src/app/shared/validators/custom.validator';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProductListComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {

  userProfileForm = new FormGroup({
    profilePic: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    email: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl('')
  })
  showPassword: boolean = false;
  submitted: boolean = false;
  profileImage: any;

  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails()
  }
  /**
   * getting form all controls
   */
  get fc() {
    return this.userProfileForm.controls;
  }
  getUserDetails() {
    this.authService.getSingleUser().subscribe({
      next: (res: any) => {
        if (res.success) {
          console.log(res.data.profilePic);

          if (!res.data.profilePic) {
            this.profileImage = res.data.gender === 'female' ? '/assets/img/defaultUserFemale.png' : '/assets/img/defaultUserMale.png'
          }
          else {
            this.profileImage = res.data.profilePic;
          }

          this.userProfileForm.patchValue({
            firstName: res?.data?.firstName,
            lastName: res?.data?.lastName,
            phone: res?.data?.phone,
            email: res?.data?.email,
            gender: res?.data?.gender,
          });
          this.setDOB(res?.data?.dob);

          this.cd.markForCheck()
        }
      },
      error: (err: any) => {
        console.log("error occurred");

      }
    })
  }

  setDOB(dob: any) {
    let date = new Date(dob),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    this.userProfileForm.patchValue({ dob: [date.getFullYear(), month, day].join("-") })

  }
  /**
   * set the profile image as preview
   * @param event Event
   */
  getProfilePhoto(event: any) {

    console.log(event.target.files);

    if (event.target.files[0].size > 2097152) {
      alert("File is too big!");
    }
    else {

      let reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        this.cd.markForCheck()
      }
      reader.readAsDataURL(event.target.files[0]);
      this.userProfileForm.patchValue({ profilePic: event.target.files[0] })
    }
  }

  /**
   * removes the profile pic
   */
  removeProfile() {
    this.profileImage = '/assets/img/defaultUserMale.png'
    this.fc.profilePic.setValue('');
    this.cd.markForCheck()
  }

  /**
   * send a put request to update the user data
   */
  handleSubmit() {
    this.submitted = true

    if (this.userProfileForm.valid) {

      const formData: any = new FormData();
      formData.append('firstName', this.fc.firstName.value);
      formData.append('lastName', this.fc.lastName.value);
      formData.append('phone', this.fc.phone.value);
      formData.append('profilePic', this.fc.profilePic.value);
      formData.append('gender', this.fc.gender.value);
      formData.append('dob', this.fc.dob.value);



      this.userService.updateUserProfile(formData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.getUserDetails()

        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

}