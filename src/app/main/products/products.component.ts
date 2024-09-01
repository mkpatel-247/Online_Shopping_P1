import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LabelType, NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { SORTING } from './products.data';
import { map } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule, RouterModule, ProductListComponent, ProductGridComponent, NgbPaginationModule, NgxSliderModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {

  productDetails: any = '';
  catId: string = '';
  categoryUnit: string[] = ['8UK', '7UK', 'S', 'L', 'XL', 'M'];
  searchQuery: string = '';
  page = 1;
  totalPage = 1;
  viewType: boolean = true;
  minValue: number = 0;
  maxValue: number = 600;
  totalProducts: number = 0;
  sortingValue = SORTING;
  params: any = '';
  sizesParam: any = [];

  constructor(private route: ActivatedRoute, public commonService: CommonService, private productService: ProductService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.checkParams();
    this.setBreadCrumb()
  }


  ngOnDestroy(): void {
    //Add empty string so that data get empty when this component destroy.
    this.commonService.breadCrumb.next([]);
  }

  /**
   * Check params is exist and handle it.
   */
  private checkParams() {
    this.route.queryParams.subscribe({
      next: (param: any) => {
        const { categoryId, ...rest } = param;
        this.catId = categoryId;
        this.params = rest;

        this.getProducts();
        if (this.catId) {
          this.categorySize(this.catId);
        } else {
          this.setBreadCrumb();
        }

        if (this.params.price) {
          this.minValue = this.params.price[0];
          this.maxValue = this.params.price[1];
        }
        this.cdr.markForCheck();
      }
    })
  }

  /**
   * Fetch product details from API.
   */
  private getProducts(page?: number) {
    delete this.params.categoryId
    this.params = { ...this.params, productPerPage: 6, currentPage: page || 1 }
    this.productService.getProducts(this.params).pipe(
      map((res: any) => {
        this.totalPage = res.data.totalPages;
        this.totalProducts = res.data.totalProducts;
        const products = res?.data?.data || [];
        if (this.catId) {
          return products.filter((ele: any) => ele.categoryId === this.catId);
        }
        this.options.floor = res.data.minPriceValue;
        this.options.ceil = res.data.maxPriceValue;
        return products;
      })
    ).subscribe({
      next: (filteredProducts: any) => {
        this.productDetails = filteredProducts;
        this.cdr.markForCheck();
      },
      error: () => {
        this.productDetails = [];
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Get the sizes of selected category.
   * @param id category id
   */
  private categorySize(id: string) {
    let categoryName = '';
    this.productService.getAllCategories(id).pipe(
      map((x: any) => {
        return x.data.filter((x: any) => x._id === id)
      })
    ).subscribe({
      next: (res: any) => {
        categoryName = res[0]?.name;
        // this.categoryUnit = res[0]?.unit;
        this.cdr.markForCheck();
      },
      complete: () => {
        if (categoryName)
          this.setBreadCrumb(categoryName);
        this.cdr.markForCheck();
      }
    })
  }

  /**
   * Pagination
   * @param page page number
   */
  refreshItems(page: number) {
    // this.router.navigate(['/product'], { relativeTo: this.route, queryParams: { productPerPage: 6, currentPage: page }, queryParamsHandling: 'merge' })
    this.getProducts(page);
  }

  /**
   * Handle price range slider.
   * @param data 
   */
  priceRangeItems(data: any) {
    this.router.navigate(['/product'], { relativeTo: this.route, queryParams: { price: [this.minValue, this.maxValue] }, queryParamsHandling: 'merge' })
  }

  sorting(value: string) {
    this.router.navigate(['/product'], { relativeTo: this.route, queryParams: { sort: value }, queryParamsHandling: 'merge' })
  }

  /**
   * Get a list of wishlist product.
   */
  getWishlistProducts() {
    this.productService.getWishlistProduct().subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.productService.wishlistItems.next(res.data.products?.length);
        }
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.productService.wishlistItems.next(0);
      }
    })
  }

  /**
   * Add/Delete from wishlist.
   * @param event value of wishlist.
   */
  wishlistOperation(event: any) {
    event.isWishlist ? this.deleteProductFromWishlist(event.id) : this.addProductIntoWishlist(event.id);
    this.getProducts();
  }

  /**
   * Add product into wishlist.
   */
  addProductIntoWishlist(id: string) {
    this.productService.addProductIntoWishlist({ 'product': id }).subscribe({
      next: (res: any) => {
        this.cdr.markForCheck();
      },
      complete: () => {
        this.getWishlistProducts()
      }
    })
  }

  /**
   * Delete product from wishlist.
   */
  deleteProductFromWishlist(id: string) {
    this.productService.deleteProductFromWishlist({ 'product': id }).subscribe({
      next: (res: any) => {
        this.cdr.markForCheck();
      },
      complete: () => {
        this.getWishlistProducts()
      }
    })
  }

  /**
   * Slider options.
   */
  options: Options = {
    floor: this.minValue,
    ceil: this.maxValue,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    },
    getSelectionBarColor: (value: number): string => {
      return "#ffd333";
    },
    getPointerColor: (): string => {
      return "#ffd333";
    }
  };
  /*
  * setting breadcrumb data as per the selected category
  */
  setBreadCrumb(categoryName?: string) {
    let breadCrumbData;
    if (categoryName) {
      breadCrumbData = [
        {
          pageTitle: 'Product',
          linkList: [
            { label: 'Home', link: '/home' },
            { label: 'Products', link: '/product' },
            { label: categoryName, link: '' },
          ]
        }
      ]
    } else {
      breadCrumbData = [
        {
          pageTitle: 'Product',
          linkList: [
            { label: 'Home', link: '/home' },
            { label: 'Products', link: '/product' },
          ]
        }
      ]
    }
    this.commonService.breadCrumb.next(breadCrumbData);
    this.cdr.markForCheck()
  }

  /**
   * Filter for sizes.
   */
  sizeParams(size: any) {
    if (this.params.sizes) {
      if (this.sizesParam.includes(size)) {
        let index = this.sizesParam.findIndex((s: any) => size === s)
        this.sizesParam.splice(index, 1);
      } else {
        this.sizesParam.push(size);
      }
    } else {
      this.sizesParam.push(size)
    }
    this.router.navigate(['/product'], { relativeTo: this.route, queryParams: { sizes: this.sizesParam }, queryParamsHandling: 'merge' })
  }
}
