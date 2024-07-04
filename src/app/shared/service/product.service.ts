import { Injectable } from '@angular/core';
import { CATEGORY, PRODUCT } from '../constant/api.constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartItems = new BehaviorSubject<number>(0)
  constructor(private http: HttpService) { }

  /**
   * Get all product details.
   */
  getProducts(params?: any): Observable<Object> {
    return this.http.get(PRODUCT.PRODUCT_DETAILS, params);
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

  /**
   * Add new review into product.
   * @param productId unique id of product in which we need to add review.
   * @param data review and rating object => { rating: 3, review: "..." }
   * @returns response from API.
   */
  addProductReview(productId: string, data: any): Observable<any> {
    return this.http.post(PRODUCT.ADD_REVIEW + productId, data);
  }

  /**
   * Get product review.
   * @returns API response.
   */
  getProductReview(productId: string): Observable<any> {
    return this.http.get(PRODUCT.GET_REVIEW + productId);
  }
}
