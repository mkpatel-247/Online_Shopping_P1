import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContactForm } from '../interface/contact-form';
import { CONTACT, HOME, PAGES } from '../constant/api.constant';
import { CONFIGURATION } from '../constant/api.constant';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // Store breadCrumb data
  breadCrumb = new BehaviorSubject<any>([]);

  constructor(private http: HttpService) { }

  /**
   * Make a post request and send a message.
   * @param data Contact form data
   * @returns make a post request to enquiry API.
   */
  sendMessage(data: ContactForm) {
    return this.http.post(CONTACT.ENQUIRY, data);
  }

  /**
   * getting Help Center or About us data as per the slug
   */
  getPageData(slug: string): Observable<any> {
    return this.http.get(PAGES.COMMON_PAGES + slug);
  }
  /*
   * Make a get request.
   */
  getLanguageOrCountry(params?: any): Observable<any> {
    return this.http.get(CONFIGURATION.LANGUAGE_COUNTRY, params);
  }

  /**
   * Get site configuration.
   */
  getSiteConfig(): Observable<any> {
    return this.http.get(CONFIGURATION.SITE_CONFIG);
  }

  /**
   * getting offer banner data
   */
  getOfferBanner(): Observable<any> {
    return this.http.get(HOME.OFFER_BANNER);
  }
}
