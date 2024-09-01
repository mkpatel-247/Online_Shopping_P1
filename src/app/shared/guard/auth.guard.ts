import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TOAST_ICON, TOAST_STATE } from '../constant/app.constant';
import { ToastMessageService } from '../components/toast-message/toast-message.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const toastService = inject(ToastMessageService);
  if (authService.getLoginTokenFromLocalStorage()) {
    return true;
  } else {
    toastService.showToast(TOAST_ICON.warningIcon, TOAST_STATE.warning, "Your are not authorized");
    router.navigate(['/auth/login'])
    return false;
  }
};
