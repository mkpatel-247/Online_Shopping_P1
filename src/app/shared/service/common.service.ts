import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactForm } from '../interface/contact-form';
import { CONTACT } from '../constant/api.constant';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // Store breadCrumb data
  breadCrumb = new BehaviorSubject<any>('');

  //Manage shop grid/list view
  shopView = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpService) { }

  /**
   * Make a post request and send a message.
   * @param data Contact form data
   * @returns make a post request to enquiry API.
   */
  sendMessage(data: ContactForm) {
    return this.http.post(CONTACT.ENQUIRY, data);
  }
}
