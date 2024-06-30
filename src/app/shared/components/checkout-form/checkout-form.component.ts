import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid } from '../../validators/custom.validator';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {

  checkoutForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, isEmailValid()]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl(''),
    country: new FormControl('null', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required])
  });
  submitted : boolean = false;
  
  // Getter functions for easy access to form controls
  get fc() { return this.checkoutForm.controls; }

  handleSubmit() {

  }
}
