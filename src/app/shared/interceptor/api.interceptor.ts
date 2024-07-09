import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastMessageService } from '../components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from '../constant/app.constant';
import { ProductService } from '../service/product.service';

export const ApiInterceptor: HttpInterceptorFn = (request, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastMessageService);
  const productService = inject(ProductService);

  const authToken = authService.getLoginTokenFromLocalStorage();
  if (authToken) {
    request = request.clone({
      headers: request.headers.set('authorization', `Bearer ${authToken}`)
    });
  }
  return next(request).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('userDetail');
        authService.userDetail.next([]);
        productService.cartItems.next(0);
        productService.wishlistItems.next(0);
        router.navigate(['/auth/login']);
        return throwError(() => "Logout");
      }
      if (error.status === 400 && !request.url.includes('/cart')) {
        toastService.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, error.error.message);
      }
      return throwError(() => 'Unknown Error');
    })
  )
}
