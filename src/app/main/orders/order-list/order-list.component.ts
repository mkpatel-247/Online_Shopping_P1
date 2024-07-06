import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { CommonService } from 'src/app/shared/service/common.service';
@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit {

  orderData: any;
  orderList: any;
  orderId: string = '';
  constructor(private commonService : CommonService, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private cartService: CartService, private toastService: ToastMessageService) { }
  ngOnInit(): void {
    
    this.orderId = this.route.snapshot.params['id'];
    const breadCrumbData = [
      {
        pageTitle: 'Checkout',
        linkList: [
          { label: 'Home', link: '/home' },
          { label : 'Cart', link: '/cart' },
          { label: 'Checkout', link: '/checkout' },
          { label: 'Orders', link: '/orders' },
          { label: this.orderId, link:''}
        ]
      }
    ]
    this.commonService.breadCrumb.next(breadCrumbData);
    this.getOrderDetails()
  }
  getOrderDetails() {
    this.cartService.getSingleOrder(this.orderId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.orderList = res.data;

          if (!this.orderList.products.length) {
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

