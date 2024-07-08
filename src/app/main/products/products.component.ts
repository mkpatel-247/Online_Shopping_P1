import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';
import { LabelType, NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { SORTING } from './products.data';

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
  searchQuery: string = '';
  page = 1;
  totalPage = 1;
  viewType: boolean = true;
  minValue: number = 0;
  maxValue: number = 600;
  price = [];
  sortParams: string = 'popularity'
  sortingValue = SORTING;
  constructor(private route: ActivatedRoute, public commonService: CommonService, private productService: ProductService, private cdr: ChangeDetectorRef, private toastService: ToastMessageService, private router: Router) { }

  ngOnInit(): void {
    this.checkParams();
    this.setBreadCrumb()
  }


  ngOnDestroy(): void {
    //Add empty string so that data get empty when this component destroy.
    this.commonService.breadCrumb.next([]);
  }
  private checkParams() {
    this.route.queryParams.subscribe({
      next: (param: any) => {
        this.catId = param['categoryId'];
        this.searchQuery = param['search'];
        this.price = param['price'];
        this.sortParams = param['sort'];
        this.getProducts();
        this.cdr.markForCheck();
      }
    })
  }

  /**
   * Fetch product details from API.
   */
  private getProducts(page?: number) {
    if (this.catId) {
      this.productService.getCategoryProducts(this.catId).subscribe({
        next: (res: any) => {
          this.productDetails = res.data;
          if (res.data?.data?.length) {
            this.setBreadCrumb(res?.data.data[0].categoryName)
          }
          this.cdr.markForCheck();
        },
        error: (err: any) => {
          this.setBreadCrumb()
          this.productDetails = []
        }
      })
    } else {
      let params: any = { 'search': this.searchQuery || '', productPerPage: 6, currentPage: page || 1 };
      if (this.price) {
        params['price'] = this.price;
      }
      if (this.sortParams) {
        params['sort'] = this.sortParams;
      }
      this.productService.getProducts(params).subscribe({
        next: (res: any) => {
          this.options.floor = res.data.minPriceValue;
          this.options.ceil = res.data.maxPriceValue;

          this.productDetails = res.data;
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          this.productDetails = []
        }
      })
    }
  }

  /**
   * Pagination
   * @param page page number
   */
  refreshItems(page: number) {
    // this.router.navigate(['/product'], { relativeTo: this.route, queryParams: { productPerPage: 6, currentPage: page } });
    this.getProducts(page);
  }

  /**
   * Handle price range slider.
   * @param data 
   */
  priceRangeItems(data: any) {
    this.router.navigate(['/product'], { relativeTo: this.route, queryParams: { price: [this.minValue, this.maxValue] } })
  }

  sorting(value: string) {
    this.router.navigate(['/product'], { relativeTo: this.route, queryParams: { sort: value } })
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
        this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
        this.cdr.markForCheck();
      }
    })
  }

  /**
   * Delete product from wishlist.
   */
  deleteProductFromWishlist(id: string) {
    this.productService.deleteProductFromWishlist({ 'product': id }).subscribe({
      next: (res: any) => {
        this.toastService.showToast(TOAST_ICON.successIcon, TOAST_STATE.success, res.message);
        this.cdr.markForCheck();
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
}
