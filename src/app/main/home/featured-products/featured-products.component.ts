import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../../products/products.component';
import { ProductCardComponent } from '../../product-grid/product-grid.component';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent {
  constructor(public commonService: CommonService) {
    
  }
}
