import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ContainSpaceDirective } from 'src/app/shared/directive/contain-space.directive';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ContainSpaceDirective, OrdersComponent],
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
  userName: string = '';
  userEmail: string = '';


  constructor(private cd: ChangeDetectorRef, private authService: AuthService, private userService: UserService, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    this.getUserDetails()
  }
  /**
   * getting form all controls
   */
  get fc() {
    return this.userProfileForm.controls;
  }

  /**
   * getting user details
   * showing default img 
   * patching value of user into form
   * setting gender to default if gender is undefined
   */
  getUserDetails() {
    this.authService.getSingleUser().subscribe({
      next: (res: any) => {
        if (res.success) {

          if (!res.data?.profilePic) {
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
          this.userEmail = res?.data?.email;
          this.userName = res?.data?.firstName;

          if (!this.fc.gender.value) {
            this.fc.gender.setValue('');
          }
          this.fc.email.disable();
          this.setDOB(res?.data?.dob);

          this.cd.markForCheck()
        }
      },
      error: (err: any) => {
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Error occurred while fetching your data");
      }
    })
  }

  /**
   * set dob according to input date type
   * @param dob 
   */
  setDOB(dob: any) {
    if (dob) {
      let date = new Date(dob),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      this.userProfileForm.patchValue({ dob: [date.getFullYear(), month, day].join("-") })
    }
  }


  /**
   * set the profile image as preview
   * @param event Event
   */
  getProfilePhoto(event: any) {

    let reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result;
      this.cd.markForCheck()
    }
    reader.readAsDataURL(event.target.files[0]);
    this.userProfileForm.patchValue({ profilePic: event.target.files[0] })

  }

  /**
   * send a put request to update the user data
   */
  handleSubmit() {
    this.submitted = true;

    if (this.userProfileForm.valid) {

      const formData: any = new FormData();
      Object.keys(this.userProfileForm.value).forEach((key: string) => {
        if (this.userProfileForm.get(key)?.value && key != 'email') {
          formData.append(key, this.userProfileForm.get(key)?.value);
        }
      });
      this.userService.updateUserProfile(formData).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, "Profile Updated Successfully");
            this.cd.markForCheck();
          }
        },
        error: (err: any) => {
          this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, err.error.message);
        }
      });
    }
  }

}