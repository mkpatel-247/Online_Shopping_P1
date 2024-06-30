import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutFormComponent } from 'src/app/shared/components/checkout-form/checkout-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,CheckoutFormComponent, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  showShippingForm : boolean = false;

  setShippingForm(checkbox : any) {
    this.showShippingForm = checkbox.checked;
    
  }
}
