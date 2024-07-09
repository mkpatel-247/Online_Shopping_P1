import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/app/shared/service/product.service';
import { HEADER_MENU_LINKS } from './header-menu.data';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule, BreadCrumbComponent, RouterModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMenuComponent implements OnInit {
  categories: any = '';
  numberOfCartItem: number = 0;
  wishlistItem: number = 0;
  pageLink = HEADER_MENU_LINKS;
  siteConfig: any = '';
  constructor(public productService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCategories();
    const storedItem = JSON.parse(localStorage.getItem('cartItems') as string);
    if (storedItem) {
      this.numberOfCartItem = storedItem.length;
    } else {
      this.productService.cartItems.subscribe((res) => {
        this.numberOfCartItem = res;
        this.cdr.markForCheck();
      })
    }
    this.getWishlistItemNumber();
    this.siteConfig = JSON.parse(localStorage.getItem('siteConfig') || "null");
  }

  /**
   * Fetch categories data and for dropdown menu
   */
  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        this.cdr.markForCheck();
      }
    })
  }

  /**
   * Get the number of wishlist item.
   */
  getWishlistItemNumber() {
    this.productService.wishlistItems.subscribe({
      next: (res: any) => {
        this.wishlistItem = res;
        this.cdr.markForCheck();
      }
    })
  }
}