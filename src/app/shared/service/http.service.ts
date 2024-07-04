import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastMessageService } from '../components/toast-message/toast-message.service';
import { TOAST_ICON, TOAST_STATE } from '../constant/app.constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private toast: ToastMessageService, private router: Router) { }

  /**
   * Custom get service that handle error.
   * @param url api url in string.
   * @param params if any parameter need to pass.
   * @returns response.
   */
  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params }).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * Custom post service that handle error.
   * @param url api url in string.
   * @param data data that need to send.
   * @param params parameter if exist.
   * @param headers headers if exist.
   * @returns response.
   */
  post<T>(url: string, data: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const options = { params, headers };
    return this.http.post<T>(url, data, options).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * 
   * Custom patch service that handle error.
   * @param url api url in string.
   * @param data data that need to send.
   * @param params parameter if exist.
   * @param headers headers if exist. eg. headers = {key, value}
   * @returns response.
   */
  patch<T>(url: string, data: any, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const options = { params, headers };
    return this.http.post<T>(url, data, options).pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * If any error occur that toast message will be shown.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error) {
      this.toast.showToast(TOAST_ICON.dangerIcon, TOAST_STATE.danger, error.error.message);
    }
    return throwError(() => {
      new Error('Something bad happened; please try again later.');
    });
  }
}
