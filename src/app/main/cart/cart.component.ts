import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any = [];
  cartTotal: number = 0;
  constructor(private authService: AuthService, private cartService: CartService, private toastService: ToastMessageService, private productService: ProductService) { }
  ngOnInit(): void {

    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.cartItems = this.getDataFromLocalStorage();

      if (this.cartItems) {
        const cart = { "products": this.cartItems }
        this.cartService.addMultipleCartItems({ "products": this.cartItems }).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.getCartItemFDynamically()
            }
          },
          error: (err: any) => {

          }
        });
        localStorage.removeItem('cartItems');
        this.cartItems = [];
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
        this.productService.cartItems.next(this.cartItems.length);
        this.setCartTotal()
      },
      error: (err: any) => {
        this.cartItems = []
      }
    })
  }

  /**
   * differentiae between updating the item i.e., locally/through API
   * @param item updated item details
   */
  updateItem(item: any) {
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
      error: (err: any) => {
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Can't update item.")
      }
    });
  }

  /**
   * calculate cart subtotal
   */
  setCartTotal() {
    if (this.cartItems) {
      this.cartItems.forEach((item: any) => {
        this.cartTotal += item.totalPrice * item.quantity;
      })
    }
  }

  /**
   * delete the item from cart
   * @param productId 
   */
  deleteCartItemDynamically(productId: string) {
    this.cartService.deleteCartItem(productId).subscribe({
      next: (res: any) => {
        this.getCartItemFDynamically()
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
      storedCartItem.forEach((item: any) => {
        this.productService.getProductById(item.productId).subscribe({
          next: (res: any) => {
            if (res.success) {
              const itemDetail = { productId: res.data._id, images: [res.data.images[0]], name: res.data.name, totalPrice: res.data.price, quantity: parseInt(item.quantity), totalQuality: res.data.quantity }
              this.cartItems.push(itemDetail)
            }
          },
          error: (err: any) => {

          }
        })
      });
      this.setCartTotal()
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
  }

  /**
   * deletes the item locally
   * @param itemId 
   */
  deleteCartItemlocally(itemId: any) {
    let storedCartItem = this.getDataFromLocalStorage();
    storedCartItem.splice(storedCartItem.findIndex((cartItem: any) => cartItem.productId == itemId), 1);
    localStorage.setItem('cartItems', JSON.stringify(storedCartItem));
    this.setCartTotal();
    this.cartItems = [];
  }
}
