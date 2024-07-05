import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/service/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ContainSpaceDirective } from 'src/app/shared/directive/contain-space.directive';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [CommonModule, NgbModule, RouterLink, ReactiveFormsModule, ContainSpaceDirective],
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

  @Input({ required: true }) productId: string = '';
  @Input({ required: true }) productName: string = '';

  reviews: any = '';
  reviewForm!: FormGroup;
  userDetail: any = '';

  constructor(private productService: ProductService, private authService: AuthService, private toastService: ToastMessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductReview(this.productId);
    this.reviewFormControls();
    this.getUserDetails();
  }

  /**
   * Add review form control.
   */
  reviewFormControls() {
    this.reviewForm = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    })
  }

  /**
   * Get user detail.
   */
  getUserDetails() {
    this.authService.userDetail.subscribe({
      next: (res: any) => { this.userDetail = res; }
    })
  }

  /**
   * Get all review of product.
   */
  getProductReview(id: string) {
    // const params = { "reviewPerPage": perPage, 'currentPage': currentPage }
    this.productService.getProductReview(id).subscribe({
      next: (res: any) => {
        this.reviews = res.data;
      }
    })
  }

  /**
   * On form submit.
   */
  handleSubmit() {
    const value = this.reviewForm.value;
    if (this.reviewForm.valid) {
      this.addReview(this.productId, value);
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

  /**
   * Add review.
   * @param id product id.
   */
  addReview(id: string, data: any) {
    this.productService.addProductReview(id, data).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
        }
      }
    })
  }
}
