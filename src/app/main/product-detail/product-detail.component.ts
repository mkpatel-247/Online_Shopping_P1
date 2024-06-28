import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/service/product.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  products: any = '';
  colorSizeForm!: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

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
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res[0];
      },
      error: (err: any) => {
        //Toast Message.
      },
    })
  }

  addToCart() {
    if (this.colorSizeForm.valid) {
      console.log();

    }
    console.log(this.colorSizeForm.value);
  }
}
