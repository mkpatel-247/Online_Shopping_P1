import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { HeaderMenuComponent } from '../layout/header-menu/header-menu.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProductService } from '../shared/service/product.service';
import { CartService } from '../shared/service/cart.service';
import { ToastMessageService } from '../shared/components/toast-message/toast-message.service';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, HeaderMenuComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService, private productService: ProductService, private cartService: CartService, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.cartService.getAllCartItems().subscribe({
        next: (res: any) => {
          this.productService.cartItems.next(res?.data?.products?.length | 0);
        },
        error: (err: any) => {
          this.productService.cartItems.next(0);
        }
      })
    }
  }

}
