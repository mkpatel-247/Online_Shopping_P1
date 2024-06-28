import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Get product details.
   */
  getProducts() {
    return this.http.get('../../../assets/dummyData/products.json');
  }
}
