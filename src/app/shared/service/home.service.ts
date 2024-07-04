import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOME } from '../constant/api.constant';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpService) { }

  /**
   * @returns json of banner
   */
  getBanner(): Observable<any> {
    return this.http.get(HOME.BANNER)
  }
}
