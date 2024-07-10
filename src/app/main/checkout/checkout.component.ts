import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { FormsModule } from '@angular/forms';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { OrderData } from 'src/app/shared/interface/order-data.interface';
import { CommonService } from 'src/app/shared/service/common.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckoutFormComponent, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit, OnDestroy {

  showShippingForm: boolean = false;
  cartItems: any[] = [];
  subTotal: number = 0;
  shippingCharge: number = 10;
  paymentMethods = ['paypal', 'direct card', 'bank transfer'];
  paymentMethod: string = '';
  isPaymentMethodSelected: boolean = false;
  shippingDetails: any;
  coupon: string = '';
  discount: number = 0;
  discountType = { percent: 'percentage', amount: 'amount' };
  couponApplied: boolean = false;

  constructor(private productService: ProductService, private commonService: CommonService, private router: Router, private cd: ChangeDetectorRef, private cartService: CartService, private toastService: ToastMessageService, public authService: AuthService) { }

  ngOnInit(): void {
    const breadCrumbData = [
      {
        pageTitle: 'Checkout',
        linkList: [
          { label: 'Home', link: '/home' },
          { label: 'Cart', link: '/cart' },
          { label: 'Checkout', link: '/checkout' },
        ]
      }
    ]
    this.commonService.breadCrumb.next(breadCrumbData);
    this.getCartItems();
  }
  ngOnDestroy(): void {
    localStorage.removeItem('couponCode');
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
        if (!this.cartItems) {
          this.router.navigate(['/product'])
        }
        this.countSubTotal()
        this.cd.markForCheck()
      },
      error: (err: any) => {
      }
    })
  }

  /**
   * count the total amount customer need to pay
   */
  countSubTotal() {
    this.subTotal = 0
    this.cartItems.forEach((item: any) => {
      this.subTotal += item.totalPrice;
    })
    const isCoupon = localStorage.getItem('couponCode');
    if (isCoupon) {
      this.coupon = isCoupon;
      this.checkCoupon();
    }
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
      //If coupon exist.
      if (this.coupon)
        orderDetails['couponCode'] = this.coupon

      this.cartService.addOrder(orderDetails).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.productService.cartItems.next(0)
            this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
            localStorage.removeItem('couponCode');
            this.router.navigate(['/orders'])
          }
        }
      })
    }
  }
  /**
   * Check the coupon is valid or not.
   */
  checkCoupon() {
    if (!this.couponApplied && this.coupon) {
      this.cartService.getCoupon(this.coupon).subscribe({
        next: (res: any) => {
          this.discount = res.data.value;
          if (this.discount) {
            let isAboveZero = 0;
            if (res.data.type == this.discountType.percent) {
              isAboveZero = (this.subTotal / 100) * this.discount;
            } else {
              isAboveZero = (this.subTotal - this.discount);
            }
            this.discount = isAboveZero ? isAboveZero : 0;
            this.countSubTotal();
            this.couponApplied = true;
            localStorage.setItem('couponCode', this.coupon);
          } else {
            this.removeCoupon();
            this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, res.message);
          }
          this.cd.markForCheck();
        }
      });
    }
  }

  /**
   * Remove Coupon.
   */
  removeCoupon() {
    this.coupon = '';
    this.couponApplied = false;
    this.discount = 0;
    localStorage.removeItem('couponCode');
  }
}
