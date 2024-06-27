import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // Store breadCrumb data
  breadCrumb = new BehaviorSubject<any>('');

  //Manage shop grid/list view
  shopView = new BehaviorSubject<boolean>(true);

  constructor() { }
}
