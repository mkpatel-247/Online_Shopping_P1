import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEmailValid } from 'src/app/shared/validators/custom.validator';
import { ContainSpaceDirective } from 'src/app/shared/directive/contain-space.directive';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ContainSpaceDirective],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {

  checkoutForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, isEmailValid()]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6)])
  });
  submitted: boolean = false;
  @Output() addressDetails = new EventEmitter<any>();

  /**
   * Getter functions for easy access to form controls
   */
  get fc() { return this.checkoutForm.controls; }

  /**
   * emitting form details
   */
  handleSubmit() {
    this.submitted = true;
    if (this.checkoutForm.valid) {
      this.addressDetails.emit(this.checkoutForm.value);
      Object.keys(this.checkoutForm.value).forEach((key: string) => {
        this.checkoutForm.get(key)?.disable();
      })
    }
  }
}
