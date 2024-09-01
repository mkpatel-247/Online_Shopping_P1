import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { PAGES } from '../constant/api.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpService) { }

  /**
   * Get faq's category.
   */
  getFaqCategories(): Observable<any> {
    return this.http.get(PAGES.FAQ_CATEGORY);
  }

  /**
   * Get specific faq data as per category id.
   * @param catId category id.
   */
  getFaqData(catId: string): Observable<any> {
    return this.http.get(PAGES.CATEGORY_WISE_FAQ + catId);
  }
}
