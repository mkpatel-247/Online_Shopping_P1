import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRODUCT } from '../constant/api.constant';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartItems = new BehaviorSubject<number>(0)
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
   * 
   * @returns promise response.
   */
  getAllProductDetails() {
    return new Promise((resolve, reject) => {
      this.getProducts().subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err: any) => {
          resolve(err)
        }
      })
    })
  }
}
