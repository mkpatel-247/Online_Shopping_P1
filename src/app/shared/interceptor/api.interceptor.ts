import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastMessageService } from '../components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from '../constant/app.constant';
import { ProductService } from '../service/product.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private toast: ToastMessageService, private productService: ProductService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getLoginTokenFromLocalStorage();
    if (authToken) {
      request = request.clone({
        headers: request.headers.set('authorization', `Bearer ${authToken}`)
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.removeItem('loginToken');
          localStorage.removeItem('userDetail');
          this.authService.userDetail.next([]);
          this.productService.cartItems.next(0);
          this.productService.wishlistItems.next(0);
          this.router.navigate(['/auth/login']);
          return throwError(() => "Logout");
        }
        if (error.status === 400 && !request.url.includes('/cart')) {
          this.toast.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, error.error.message);
        }
        return throwError(() => 'Unknown Error');
      })
    );
  }
}
