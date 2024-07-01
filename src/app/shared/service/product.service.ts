import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CATEGORY, PRODUCT } from '../constant/api.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Get all product details.
   */
  getProducts(): Observable<any> {
    return this.http.get(PRODUCT.PRODUCT_DETAILS);
  }

  /**
   * Fetch a single product details.
   * @param productId id of product.
   * @returns response of a one product.
   */
  getProductById(productId: string): Observable<any> {
    return this.http.get(PRODUCT.PRODUCT_BY_ID + productId);
  }

  /**
   * Fetch all categories.
   * @returns response of category api.
   */
  getAllCategories(): Observable<any> {
    return this.http.get(CATEGORY);
  }

  /**
   * Fetch the selected category data.
   * @param categoryId categoryId that related products need to fetch.
   * @returns response of api.
   */
  getCategoryProducts(categoryId: string): Observable<any> {
    return this.http.get(PRODUCT.RELATED_PRODUCT + categoryId);
  }
}
