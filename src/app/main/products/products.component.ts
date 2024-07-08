import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/service/common.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilterByComponent } from './filter-by/filter-by.component';
import { ViewTypeComponent } from './view-type/view-type.component';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TOAST_ICON, TOAST_STATE } from 'src/app/shared/constant/app.constant';
import { ToastMessageService } from 'src/app/shared/components/toast-message/toast-message.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule, FilterByComponent, ViewTypeComponent, RouterModule, ProductListComponent, ProductGridComponent, NgbPaginationModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {

  productDetails: any = '';
  catId: string = '';
  searchQuery: string = '';
  page = 1;
  totalPage = 1;

  constructor(private route: ActivatedRoute, public commonService: CommonService, private productService: ProductService, private cdr: ChangeDetectorRef, private toastService: ToastMessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (param: any) => {
        this.catId = param['categoryId'];
        this.searchQuery = param['search'];
        this.getProducts();
        this.cdr.markForCheck();
      }
    })
    this.setBreadCrumb()
  }

  ngOnDestroy(): void {
    //Add empty string so that data get empty when this component destroy.
    this.commonService.breadCrumb.next([]);
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
      const search = { 'search': this.searchQuery || '', productPerPage: 6, currentPage: page || 1 }
      this.productService.getProducts(search).subscribe({
        next: (res: any) => {
          this.productDetails = res.data;
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          this.productDetails = []
        }
      })
    }
  }

  refreshItems(page: number) {
    this.getProducts(page);
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
