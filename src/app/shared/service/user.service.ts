import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_PREFIX } from '../constant/api.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUserProfile(updatedProfileData: any): Observable<any> {
    return this.http.put(AUTH_PREFIX, updatedProfileData);
  }
}
