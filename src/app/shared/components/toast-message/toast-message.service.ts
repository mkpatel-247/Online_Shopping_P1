import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOAST_STATE } from '../../constant/app.constant';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  public showToast$ = new BehaviorSubject<boolean>(false);
  public toastMessage$ = new BehaviorSubject<string>('')
  public toastState$ = new BehaviorSubject<string>(TOAST_STATE.success);
  public toastIcon$ = new BehaviorSubject<string>('');
  constructor() { }

  /**
   * set behavior Subject data on call
   * @param toastState state of toast i.e., success, warning, danger
   * @param toastMsg message to show on toaster
   */
  showToast(toastIcon: string, toastState: string, toastMsg: string) {
    this.toastIcon$.next(toastIcon)
    this.toastState$.next(toastState);
    this.toastMessage$.next(toastMsg);
    this.showToast$.next(true);

    setTimeout(() => {
      this.closeToast()
    }, 4000);
  }

  /**
   * close the toaster notification
   */
  closeToast() {
    this.showToast$.next(false)
  }
}
