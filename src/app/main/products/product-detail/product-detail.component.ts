import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/service/product.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RelatedProductComponent } from './related-product/related-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RelatedProductComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {

  products: any = '';
  productDescription: any = '';
  colorSizeForm!: FormGroup;
  storedItem: any[] = [];
  proID: string = '';
  constructor(private productService: ProductService, private route: ActivatedRoute, private toastService: ToastMessageService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProductsData();
    this.colorSizeFormControls();
    this.storedItem = JSON.parse(localStorage.getItem('cartItems') as string);
    if (!this.storedItem) {
      this.storedItem = [];
      localStorage.setItem('cartItems', JSON.stringify(this.storedItem));
    }
    else if (this.storedItem.length > 0) {

      let isItem = this.storedItem.find((item: any) => item.productId === this.proID);
      this.colorSizeForm.patchValue({ quantity: isItem.quantity, size: isItem.size, color: isItem.color });
      console.log(this.colorSizeForm.value);

    }
  }

  /**
   * Form controls for color and size.
   */
  colorSizeFormControls() {
    this.colorSizeForm = new FormGroup({
      productId: new FormControl(this.route.snapshot.params['id']),
      name: new FormControl(''),
      size: new FormControl(''),
      color: new FormControl(''),
      quantity: new FormControl(1)
    })
  }

  setProductImages() {

  }
  /**
   * Get product data from API.
   */
  getProductsData() {
    this.proID = this.route.snapshot.params['id'];
    this.productService.getProductById(this.proID).subscribe({
      next: (res: any) => {
        if (res.success) {
          res['data'].forEach((element: any) => {
            this.products = element;
            this.productDescription = element.description;
          });
        } else {
          this.router.navigateByUrl('/product');
        }
        this.cd.markForCheck();
      },
      error: (err: any) => {
        //Toast Message.
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, err.message || "Not Found")
      },
    })
  }

  /**
   * add item to cart list
   * if user logged in then --> post API
   * else store it into local storage
   */
  addToCart() {
    if (this.colorSizeForm.valid) {
      let itemIndex = -1;
      if (this.storedItem) {
        itemIndex = this.storedItem.findIndex((item: any) => item.productId === this.colorSizeForm.value.productId);
      }

      if (itemIndex === -1) {
        this.colorSizeForm.value.name = this.products.name;
        let item = { ...this.colorSizeForm.value, images: this.products.images, price: this.products.price }
        this.storedItem.push(item);
        this.productService.cartItems.next(this.storedItem.length);
      } else {
        console.log(this.colorSizeForm.value.quantity, this.storedItem[itemIndex].quantity);
        this.storedItem[itemIndex].quantity += this.colorSizeForm.value.quantity;
        this.colorSizeForm.patchValue({ quantity: this.storedItem[itemIndex].quantity })
        this.productService.cartItems.next(this.storedItem[itemIndex].quantity);

      }
      localStorage.setItem('cartItems', JSON.stringify(this.storedItem));
    }
  }
}
