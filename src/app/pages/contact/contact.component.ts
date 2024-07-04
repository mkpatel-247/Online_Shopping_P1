import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { isEmailValid, isOnlySpaceExist } from 'src/app/shared/validators/custom.validator';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ContainSpaceDirective } from 'src/app/shared/directive/contain-space.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContainSpaceDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  contactForm !: FormGroup;
  messageSent: boolean = true;
  constructor(private route: ActivatedRoute, private commonService: CommonService, private fb: FormBuilder, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    //Add router's data into common service breadCrumb subject
    this.commonService.breadCrumb.next(this.route.data);
    //Initialize contact Form control
    this.initializeForm();
  }

  ngOnDestroy(): void {
    //Add empty string so that data get empty when this component destroy.
    this.commonService.breadCrumb.next('');
  }

  /**
   * Create control Form controls.
   */
  initializeForm() {
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required, isOnlySpaceExist()]),
      email: new FormControl('', [Validators.required, isEmailValid()]),
      subject: new FormControl('', [Validators.required, isOnlySpaceExist()]),
      message: new FormControl('', [Validators.required, isOnlySpaceExist()])
    })
  }

  /**
   * On contact form submit API call will be execute to send data.
   * As per the response from API toast message will be shown.
   */
  handleSubmit() {
    const value = this.contactForm.value;
    if (this.contactForm.valid) {
      this.commonService.sendMessage(value).subscribe({
        next: (response: any) => {
          this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, response.message);
          this.messageSent = false;
        },
        error: (err: any) => {
          this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.warning, 'There is error in sending messages');
        },
        complete: () => { }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
