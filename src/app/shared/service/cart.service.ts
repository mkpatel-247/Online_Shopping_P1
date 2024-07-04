import { Injectable } from '@angular/core';
import { CART } from '../constant/api.constant';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpService) { }

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
  deleteCartItem(productId: string): Observable<any> {
    return this.http.delete(CART.DEL_CART_ITEM + productId);
  }

  /**
   * add all the items to data base
   * @param items multiple cart items from local storage
   */
  addMultipleCartItems(items: any) {
    return this.http.post(CART.CREATE_MULTIPLE_ITEMS, items)
  }
}
