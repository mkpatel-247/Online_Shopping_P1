import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { ProductGridImageDirective } from 'src/app/shared/directive/product-grid-image.directive';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbRating, ProductGridImageDirective],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent {
  @Input({ required: true }) products: any = '';
  @Output() wishlist = new EventEmitter<any>();

  constructor(private toastService: ToastMessageService, private productService: ProductService, private cdr: ChangeDetectorRef) { }

  /**
   * Add product into wishlist.
   */
  addProductIntoWishlist(id: string) {
    this.productService.addProductIntoWishlist({ 'product': id }).subscribe({
      next: (res: any) => {
        this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
        this.cdr.markForCheck();
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
        this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
        this.cdr.markForCheck();
      }
    })
  }
}
