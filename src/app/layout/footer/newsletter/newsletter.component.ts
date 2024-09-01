import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid } from 'src/app/shared/validators/custom.validator';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent implements OnInit {

  newsLetterForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastMessageService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initializeNewsletterForm();
  }

  /**
   * Create form control for newsletter form.
   */
  initializeNewsletterForm() {
    this.newsLetterForm = this.fb.group({
      email: new FormControl('', [Validators.required, isEmailValid()])
    })
  }

  /**
   * When newsletter form is submit.
   */
  handleSubmit() {
    const value = this.newsLetterForm.value
    if (this.newsLetterForm.valid) {
      this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, "Subscribe to newsletter...")
      this.newsLetterForm.reset();
    } else {
      this.newsLetterForm.markAllAsTouched();
    }
    this.cdr.markForCheck();
  }
}
