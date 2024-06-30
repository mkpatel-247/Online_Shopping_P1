import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/service/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RelatedProductComponent } from './related-product/related-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RelatedProductComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  products: any = '';
  productDescription: any = '';
  colorSizeForm!: FormGroup;

  constructor(private productService: ProductService, private route: ActivatedRoute, private toastService: ToastMessageService, private router: Router) { }

  ngOnInit(): void {
    this.getProductsData();
    this.colorSizeFormControls();
  }

  /**
   * Form controls for color and size.
   */
  colorSizeFormControls() {
    this.colorSizeForm = new FormGroup({
      size: new FormControl(''),
      color: new FormControl(''),
      quantity: new FormControl(1)
    })
  }

  /**
   * Get product data from API.
   */
  getProductsData() {
    const proID = this.route.snapshot.params['id'];
    this.productService.getProductById(proID).subscribe({
      next: (res: any) => {
        if (res.success) {
          res['data'].forEach((element: any) => {
            this.products = element;
            this.productDescription = element.description;
          });
        } else {
          this.router.navigateByUrl('/product');
        }
      },
      error: (err: any) => {
        //Toast Message.
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, err.message || "Not Found")
      },
    })
  }

  addToCart() {
    if (this.colorSizeForm.valid) {

    }
    console.log(this.colorSizeForm.value);
  }
}
