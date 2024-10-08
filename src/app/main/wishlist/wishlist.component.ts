import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductService } from 'src/app/shared/service/product.service';
import { RouterLink } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';

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

  constructor(private productService: ProductService, private commonService: CommonService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const breadCrumbData = [
      {
        pageTitle: 'Checkout',
        linkList: [
          { label: 'Home', link: '/home' },
          { label: 'Wish List', link: '/wishlist' }
        ]
      }
    ]
    this.commonService.breadCrumb.next(breadCrumbData);
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
          this.productService.wishlistItems.next(this.wishListProducts?.length);
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
        this.getWishlistProducts();
        this.cdr.markForCheck();
      }
    })
  }
}
