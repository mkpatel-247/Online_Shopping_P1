import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/service/product.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  products: any = '';
  colorSizeForm!: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProductsData();
    this.colorSizeControls();
  }

  /**
   * Available Sizes form.
   */
  colorSizeControls() {
    this.colorSizeForm = new FormGroup({
      size: new FormArray([]),
      color: new FormArray([]),
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

      },
      complete: () => {

      }
    })
  }
}
