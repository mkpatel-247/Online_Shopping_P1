import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { toast } from '../../interface/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  public toasts: toast[] = [];
  private showToast$ = new BehaviorSubject<toast>({ message: '', class: '', show: false, icon: '' });
  constructor() { }

  /**
   * set behavior Subject data on call
   * @param toastState state of toast i.e., success, warning, danger
   * @param toastMsg message to show on toaster
   */
  showToast(toastIcon: string, toastState: string, toastMsg: string) {
    this.toasts.push({ message: toastMsg, class: toastState, show: true, icon: toastIcon });
  }

  /**
   * close the toaster notification
   */
  closeToast() {
    this.showToast$.value.show = false;
  }
}
