import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ProductService } from 'src/app/shared/service/product.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { DISCOUNT_TYPE } from './cart.data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  cartItems: any = [];
  cartTotal: number = 0;
  coupon: string = '';
  discount: number = 0;
  discountType = DISCOUNT_TYPE;
  couponApplied: boolean = false;

  constructor(public authService: AuthService, private commonService: CommonService, private cartService: CartService, private toastService: ToastMessageService, private productService: ProductService, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {

    const breadCrumbData = [
      {
        pageTitle: 'Checkout',
        linkList: [
          { label: 'Home', link: '/home' },
          { label: 'Cart', link: '/cart' }
        ]
      }
    ]
    this.commonService.breadCrumb.next(breadCrumbData);
    if (this.authService.getLoginTokenFromLocalStorage()) {
      const storedCartItem = this.getDataFromLocalStorage();

      if (storedCartItem) {
        this.pushLocalStorageToDB(storedCartItem)
      } else {
        this.getCartItemFDynamically()
      }

    } else {
      this.getCartItemLocally();
    }
  }

  /**
   * getting cart items from Data base
   */
  getCartItemFDynamically() {
    this.cartService.getAllCartItems().subscribe({
      next: (res: any) => {
        this.cartItems = res?.data?.products;
        const len = this.cartItems ? this.cartItems.length : 0;
        this.productService.cartItems.next(len);
        this.setCartTotal();
        this.cd.markForCheck()
      },
      error: (err: any) => {
        this.cartItems = [];
        this.cartTotal = 0;
        this.productService.cartItems.next(0);
        this.cd.markForCheck()
      }
    })
  }

  /**
   * differentiae between updating the item i.e., locally/through API
   * @param item updated item details
   * @param actionType plus/minus
   */
  updateItem(item: any, actionType: string) {
    if (actionType === 'minus') {
      item.quantity = (parseInt(item.quantity) - 1) + '';
    } else if (actionType === 'plus') {
      item.quantity = (parseInt(item.quantity) + 1) + '';
    }

    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.updateCartDynamically(item)
    } else {
      this.updateItemLocally(item)
    }
  }

  /**
   * differentiae between deleting the item i.e., locally/through API
   * @param itemId item id
   */
  deleteItem(itemId: any) {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.deleteCartItemDynamically(itemId);
    } else {
      this.deleteCartItemlocally(itemId);
    }

  }
  /**
   * update the quantity of item
   * @param item cart item
   */
  updateCartDynamically(item: any) {
    this.cartTotal = item.quantity * item.totalPrice;
    item.quantity += '';
    const updatedItem = { productId: item.productId, quantity: item.quantity, size: item.size, color: item.color };

    this.cartService.addCartItem(updatedItem).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.setCartTotal();
          this.cd.markForCheck()
        }
      },
      error: (err: any) => {
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Can't update item.")
      }
    });
  }

  /**
   * calculate cart subtotal
   */
  setCartTotal() {
    this.cartTotal = 0;
    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItems.forEach((item: any) => {
        this.cartTotal += item.actualPrice * item.quantity;
      })
      this.cd.markForCheck()
    }
  }

  /**
   * delete the item from cart
   * @param productId 
   */
  deleteCartItemDynamically(productId: string) {
    this.cartService.deleteCartItem(productId).subscribe({
      next: (res: any) => {
        this.getCartItemFDynamically();
        this.cd.markForCheck()
      },
      error: (err: any) => {
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Can't delete item.")
      }
    });
  }

  /**
   * getting cart items from local storage
   */
  getCartItemLocally() {
    const storedCartItem = this.getDataFromLocalStorage();
    if (storedCartItem) {
      this.cartItems = [];
      storedCartItem.forEach((item: any) => {
        this.productService.getProductById(item.productId).subscribe({
          next: (res: any) => {
            if (res.success) {
              const itemDetail = { productId: res.data._id, images: [res.data.images[0]], name: res.data.name, actualPrice: res.data.price, quantity: parseInt(item.quantity), totalQuality: res.data.quantity }
              this.cartItems.push(itemDetail);
              this.setCartTotal()
              this.cd.markForCheck();
            }
          },
          error: (err: any) => {

          }
        })
      });
    }
  }

  /**
   * get the data from local storage
   */
  getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cartItems') as string)
  }

  /**
   * updates the item locally
   * @param item updated item
   */
  updateItemLocally(item: any) {
    let storedCartItem = this.getDataFromLocalStorage()
    const itemIndex = storedCartItem.findIndex((cartItem: any) => cartItem.productId === item.productId);
    storedCartItem[itemIndex].quantity = parseInt(item.quantity)
    storedCartItem[itemIndex].quantity += ''; localStorage.setItem('cartItems', JSON.stringify(storedCartItem));
    this.setCartTotal();
    this.cd.markForCheck()
  }

  /**
   * deletes the item locally
   * @param itemId 
   */
  deleteCartItemlocally(itemId: any) {
    let storedCartItem = this.getDataFromLocalStorage();
    storedCartItem.splice(storedCartItem.findIndex((cartItem: any) => cartItem.productId == itemId), 1);
    localStorage.setItem('cartItems', JSON.stringify(storedCartItem));
    this.productService.cartItems.next(storedCartItem.length);
    this.getCartItemLocally();
    this.setCartTotal();
    this.cd.markForCheck()
  }

  /**
   * after login push all the local storage data to Data Base
   */
  pushLocalStorageToDB(storedCartItem: any) {
    this.cartService.addMultipleCartItems({ "products": storedCartItem }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.getCartItemFDynamically();
          localStorage.removeItem('cartItems');
        }
      },
      error: (err: any) => {
      }
    });
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
              isAboveZero = (this.cartTotal / 100) * this.discount;
            } else {
              isAboveZero = (this.cartTotal - this.discount);
            }
            this.discount = isAboveZero ? isAboveZero : 0;
          } else {
            this.discount = -1;
            this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, res.message);
          }
          this.setCartTotal();
          this.couponApplied = true;
          localStorage.setItem('couponCode', this.coupon);
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
