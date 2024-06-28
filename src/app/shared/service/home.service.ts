import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOME } from '../constant/api.constant';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  /**
   * @returns json of banner
   */
  getBanner(): Observable<any> {
    return this.http.get(HOME.banner)
  }
}
