import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductService } from 'src/app/shared/service/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishListProducts: any = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getWishlistProducts();
    // if ()
  }

  /**
   * Get a list of wishlist product.
   */
  getWishlistProducts() {
    this.productService.getWishlistProduct().subscribe({
      next: (res: any) => {
        if (res.success && res.data)
          this.wishListProducts = res.data.products;
        console.log(res);

      },
      error: (err: any) => {
        this.wishListProducts = [];
      }
    })
  }

  /**
   * Add product into wishlist.
   */
  addProductIntoWishlist(id: string) {
    this.productService.addProductIntoWishlist({ 'product': id }).subscribe({
      next: (res: any) => {
        console.log("Add wishlist: ", res);
      }
    })
  }

  /**
   * Delete product from wishlist.
   */
  deleteProductFromWishlist(id: string) {
    this.productService.deleteProductFromWishlist({ 'product': id }).subscribe({
      next: (res: any) => {
        console.log("Delete wishlist: ", res);
      }
    })
  }
}
