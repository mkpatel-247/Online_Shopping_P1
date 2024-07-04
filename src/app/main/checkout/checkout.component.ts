import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { FormsModule } from '@angular/forms';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { OrderData } from 'src/app/shared/interface/order-data.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckoutFormComponent, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {

  showShippingForm: boolean = false;
  cartItems: any[] = [];
  subTotal: number = 0;
  shippingCharge: number = 10;
  paymentMethods = ['paypal', 'direct card', 'bank transfer'];
  paymentMethod: string = '';
  isPaymentMethodSelected: boolean = false;
  shippingDetails: any;
  constructor(private router: Router, private cd: ChangeDetectorRef, private cartService: CartService, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    this.getCartItems()
  }
  /**
   * if user want to ship item to different address 
   * @param checkbox 
   */
  setShippingForm(checkbox: any) {
    this.showShippingForm = checkbox.checked;
  }

  /**
   * getting all cartItems
   */
  getCartItems() {
    this.cartService.getAllCartItems().subscribe({
      next: (res: any) => {
        this.cartItems = res?.data?.products;
        this.countSubTotal()
        this.cd.markForCheck()
      },
      error: (err: any) => {
        this.router.navigate(['/product'])
        this.cd.markForCheck()
      }
    })
  }

  /**
   * count the total amount customer need to pay
   */
  countSubTotal() {
    this.cartItems.forEach((item: any) => {
      this.subTotal += item.actualPrice;
    })
  }

  /**
   * handle error - if the payment method is select or not
   *              - customer have saved the address or not
   * submit the address details and place the order
   */
  handleOrder() {

    if (!this.paymentMethod.length) {
      this.isPaymentMethodSelected = true;
    }
    else if (!this.shippingDetails) {
      this.isPaymentMethodSelected = false;
      this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Save your address please.")
    }
    else {
      const sd = this.shippingDetails
      const orderDetails: OrderData = {
        paymentMethod: this.paymentMethod,
        pickUpPerson: {
          "firstName": sd.firstName,
          "lastName": sd.lastName,
          "email": sd.email,
          "contact": sd.phone
        },
        "address": {
          "line1": sd.address1,
          "line2": sd.address2,
          "country": sd.country,
          "state": sd.state,
          "city": sd.city,
          "zip": sd.zipCode
        }
      }

      this.cartService.addOrder(orderDetails).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, "Order Placed.");
            this.router.navigate(['/orders'])
          }
        }
      })
    }

  }
}
