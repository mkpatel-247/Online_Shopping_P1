import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_PREFIX } from '../constant/api.constant';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  /**
   * update the user profile
   * @param updatedProfileData user data
   */
  updateUserProfile(updatedProfileData: any): Observable<any> {
    return this.http.put(AUTH_PREFIX, updatedProfileData);
  }
}
