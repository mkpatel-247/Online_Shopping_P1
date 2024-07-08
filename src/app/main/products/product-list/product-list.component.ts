import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbRating],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input({ required: true }) products: any = [];
  @Output() wishlist = new EventEmitter<any>();
  router = inject(Router);
  wishlistObject: Object = {};

  ngOnInit(): void {
    if (this.router.url == '/wishlist') {
      this.wishlistObject = { isWishlist: true, id: this.products.productId }
    } else {
      this.wishlistObject = { isWishlist: this.products.isWishList, id: this.products._id }
    }
  }
}
