import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  breadCrumb = new BehaviorSubject<any>('');

  constructor() { }
}
