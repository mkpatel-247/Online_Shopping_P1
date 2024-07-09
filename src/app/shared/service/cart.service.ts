import { Injectable } from '@angular/core';
import { CART, ORDERS } from '../constant/api.constant';
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
  addMultipleCartItems(items: any): Observable<any> {
    return this.http.post(CART.CREATE_MULTIPLE_ITEMS, items)
  }

  /**
   * @param addressDetails
   */
  addOrder(addressDetails: any): Observable<any> {
    return this.http.post(ORDERS.PLACE_ORDER, addressDetails);
  }

  /**
   * gating all orders
   */
  getAllOrders(): Observable<any> {
    return this.http.get(ORDERS.GET_ORDERS);
  }

  /**
   * Getting single order details
   * @param orderId 
   */
  getSingleOrder(orderId: string): Observable<any> {
    return this.http.get(ORDERS.GET_SINGLE_ORDER + orderId)
  }

  /**
   * Canceling the order
   * @param orderId 
  */
  cancelOrder(orderId: string): Observable<any> {
    return this.http.put(ORDERS.CANCEL_ORDER + orderId)
  }
}
