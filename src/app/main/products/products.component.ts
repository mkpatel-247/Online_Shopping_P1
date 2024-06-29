import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilterByComponent } from './filter-by/filter-by.component';
import { ViewTypeComponent } from './view-type/view-type.component';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule, FilterByComponent, ViewTypeComponent, RouterModule, ProductListComponent, ProductGridComponent]
})
export class ProductsComponent implements OnInit, OnDestroy {

  productDetails: any = '';

  constructor(private route: ActivatedRoute, public commonService: CommonService, private productService: ProductService) { }

  ngOnInit(): void {
    //Add router's data into common service breadCrumb subject
    this.commonService.breadCrumb.next(this.route.data);
    this.getProducts();
  }

  ngOnDestroy(): void {
    //Add empty string so that data get empty when this component destroy.
    this.commonService.breadCrumb.next('');
  }

  /**
   * Fetch product details from API.
   */
  private getProducts() {
    this.productService.getAllProductDetails()
      .then((value: any) => this.productDetails = value.data)
    //   .subscribe({
    //   next: (response: any) => {
    //     this.productDetails = response;
    //     console.log(response);

    //   },
    //   error: (err: any) => {
    //     //TOAST Message.
    //   }
    // })
  }
}
