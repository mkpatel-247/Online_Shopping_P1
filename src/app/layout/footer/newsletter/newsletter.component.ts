import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid } from 'src/app/shared/validators/isEmailValid.validator';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  newsLetterForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeNewsletterForm();
  }

  initializeNewsletterForm() {
    this.newsLetterForm = this.fb.group({
      email: new FormControl('', [Validators.required, isEmailValid()])
    })
  }

  handleSubmit() {
    const value = this.newsLetterForm.value
    if (this.newsLetterForm.valid) {

      this.newsLetterForm.reset();
    } else {
      this.newsLetterForm.markAllAsTouched();
    }
    console.log(this.newsLetterForm.controls);
  }
}
