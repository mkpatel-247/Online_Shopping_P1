import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CART } from '../constant/api.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  /**
   * @param cartItemDetail (productId,size,color,quantity)
   * @returns observable of post request
   */
  addCartItem(cartItemDetail: any): Observable<any> {
    return this.http.post(CART.CREATE_CART_ITEM, cartItemDetail);
  }

  /**
   * @returns all cart items
   */
  getAllCartItems(): Observable<any> {
    return this.http.get(CART.GET_CART_ITEMS);
  }

  /**
   * delete the cart item
   */
  deleteCartItem(productId: string) {
    return this.http.delete(CART.DEL_CART_ITEM + productId);
  }

  /**
   * add all the items to data base
   * @param items multiple cart items from local storage
   */
  addMultipleCartItems(items: any) {
    console.log(items);

    return this.http.post(CART.CREATE_MULTIPLE_ITEMS, items)
  }
}
