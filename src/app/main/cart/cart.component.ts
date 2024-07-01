import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any;
  cartTotal: number = 0;
  ngOnInit(): void {
    this.getCartItem();
  }

  /**
   * getting cart items from local storage
   */
  getCartItem() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') as string);
    if (this.cartItems) {
      this.cartItems.forEach((item: any) => {
        this.cartTotal += item.price * item.quantity;
      })
    }
  }
}
