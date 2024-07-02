import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/service/product.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RelatedProductComponent } from './related-product/related-product.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RelatedProductComponent, RouterModule],
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
  cartItems: any = [];
  isItemAlreadyInCart: boolean = false;
  constructor(private productService: ProductService, private route: ActivatedRoute, private toastService: ToastMessageService, private authService: AuthService, private cartService: CartService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.getAllCartItems();
    this.getProductsData();
    this.colorSizeFormControls();
    if (!this.authService.getLoginTokenFromLocalStorage()) {
      this.storedItem = JSON.parse(localStorage.getItem('cartItems') as string);
      if (!this.storedItem) {
        localStorage.setItem('cartItems', JSON.stringify([]));
      }
    }
  }

  /**
   * Form controls for color and size.
   */
  colorSizeFormControls() {
    this.colorSizeForm = new FormGroup({
      productId: new FormControl(this.route.snapshot.params['id']),
      size: new FormControl(''),
      color: new FormControl(''),
      quantity: new FormControl(1)
    })
  }

  /**
   * getting all the cart items
   */
  getAllCartItems() {
    if (this.authService.getLoginTokenFromLocalStorage()) {
      this.cartService.getAllCartItems().subscribe({
        next: (res: any) => {
          this.cartItems = res?.data?.products;
          this.productService.cartItems.next(this.cartItems.length);
        },
        error: (err: any) => {
          this.cartItems = [];
        }
      })
    }
  }
  /**
   * Get product data from API.
   */
  getProductsData() {
    this.proID = this.route.snapshot.params['id'];
    this.productService.getProductById(this.proID).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.products = res.data;
          this.productDescription = res.data.description;
          this.colorSizeForm.get('size')?.setValue(this.products.sizes[0])
          this.colorSizeForm.get('color')?.setValue(this.products.colors[0])
        } else {
          this.router.navigateByUrl('/product');
        }
        this.cd.markForCheck();
      },
      error: (err: any) => {
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
      if (this.authService.getLoginTokenFromLocalStorage()) {
        this.manageCartDynamically()
      } else {
        this.manageCartLocally()
      }
    }
  }

  /**
   * if user is logged manage cart through api calls
   */
  manageCartDynamically() {
    const quantity = this.colorSizeForm.value.quantity;
    this.colorSizeForm.value.quantity += ''
    this.cartService.addCartItem(this.colorSizeForm.value).subscribe({
      next: (res: any) => {
        if (res.success) {

          if (!this.isItemInCart()) {

            this.colorSizeForm.value.quantity = quantity + this.productService.cartItems.value;
            this.productService.cartItems.next(this.cartItems.length + 1);
            this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, 'Item added to cart');
            this.getAllCartItems();
          }
        }
      },
      error: (err: any) => {
        this.toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, "Error occurred while updating cart")
      }
    });
  }

  /**
   * checks if the item already presents in cart or not
   */
  isItemInCart() {
    this.isItemAlreadyInCart = this.cartItems.find((item: any) => this.proID === item.productId);
    return this.isItemAlreadyInCart;
  }
  /**
   * if user is not logged in manage cart through local storage
   */
  manageCartLocally() {
    let itemIndex = -1;
    this.storedItem = JSON.parse(localStorage.getItem('cartItems') as string);

    if (this.storedItem) {
      itemIndex = this.storedItem.findIndex((item: any) => item.productId === this.colorSizeForm.value.productId);
    } else {
      this.storedItem = [];
    }

    if (itemIndex === -1) {
      this.colorSizeForm.value.quantity += '';
      this.storedItem.push(this.colorSizeForm.value);
      this.productService.cartItems.next(this.storedItem.length);
    } else {
      this.isItemAlreadyInCart = true;
      this.cd.markForCheck();
    }
    localStorage.setItem('cartItems', JSON.stringify(this.storedItem));
  }
}
