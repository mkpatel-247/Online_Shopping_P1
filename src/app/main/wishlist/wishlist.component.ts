import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductService } from 'src/app/shared/service/product.service';
import { RouterLink } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent implements OnInit {

  wishListProducts: any = [];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    this.getWishlistProducts();
  }

  /**
   * Get a list of wishlist product.
   */
  getWishlistProducts() {
    this.productService.getWishlistProduct().subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.wishListProducts = res.data.products;
          this.productService.wishlistItems.next(this.wishListProducts.length);
        }
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.wishListProducts = [];
      }
    })
  }

  /**
   * Delete product from wishlist.
   */
  deleteProductFromWishlist(data: any) {
    this.productService.deleteProductFromWishlist({ 'product': data.id }).subscribe({
      next: (res: any) => {
        this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
        this.getWishlistProducts();
        this.cdr.markForCheck();
      }
    })
  }
}
