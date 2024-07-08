import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/shared/service/cart.service';
import { Router, RouterModule } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ProductGridImageDirective } from 'src/app/shared/directive/product-grid-image.directive';
import { OrderListComponent } from './order-list/order-list.component';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ProductGridImageDirective, OrderListComponent, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {

  orderData: any;
  constructor(private commonService: CommonService, private cd: ChangeDetectorRef, public router: Router, private cartService: CartService, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    if (this.router.url !== '/profile') {
      const breadCrumbData = [
        {
          pageTitle: 'Checkout',
          linkList: [
            { label: 'Home', link: '/home' },
            { label: 'Cart', link: '/cart' },
            { label: 'Checkout', link: '/checkout' },
            { label: 'Orders', link: '/orders' }
          ]
        }
      ]
      this.commonService.breadCrumb.next(breadCrumbData);
    }

    this.getAllUserOrders();
  }
  getAllUserOrders() {
    this.cartService.getAllOrders().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.orderData = res.data.orderData;
          if (!this.orderData.length) {
            this.router.navigate(['/product']);
          }
          this.cd.markForCheck()
        }
      },
      error: (err: any) => {
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Error occurred while fetching your orders.")
      }
    })
  }
}
