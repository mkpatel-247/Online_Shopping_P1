import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CheckoutFormComponent, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  showShippingForm: boolean = false;

  setShippingForm(checkbox: any) {
    this.showShippingForm = checkbox.checked;

  }
}
