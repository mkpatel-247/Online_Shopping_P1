import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProduct } from 'src/app/shared/interface/product.interface';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductGridComponent } from '../../products/product-grid/product-grid.component';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, ProductGridComponent],
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {

  featuredProduct: FeaturedProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  private getFeaturedProducts() {
    this.productService.getFeatureProducts().subscribe({
      next: (res: any) => {
        this.featuredProduct = res.data.data;
        console.log(this.featuredProduct);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
