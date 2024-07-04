import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_PREFIX } from '../constant/api.constant';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  updateUserProfile(updatedProfileData: any): Observable<any> {
    return this.http.put(AUTH_PREFIX, updatedProfileData);
  }
}
