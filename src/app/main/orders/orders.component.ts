import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/shared/service/cart.service';
import { Router } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ProductGridImageDirective } from 'src/app/shared/directive/product-grid-image.directive';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ProductGridImageDirective],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderList: any;
  orderData: any;
  constructor(private router: Router, private cartService: CartService, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    this.getAllUserOrders();
  }
  getAllUserOrders() {
    this.cartService.getAllOrders().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.orderList = res.data;
          this.orderData = res.data.orderData;
          if (!this.orderData.length) {
            this.router.navigate(['/product']);
          }
        }
      },
      error: (err: any) => {
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Error occurred while fetching your orders.")

      }
    })
  }
}
