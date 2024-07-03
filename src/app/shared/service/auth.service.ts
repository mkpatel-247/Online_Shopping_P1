import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AUTH, AUTH_PREFIX } from '../constant/api.constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetails } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails = new BehaviorSubject<UserDetails>({ _id: '', firstName: '', lastName: '', email: '', phone: 0, createdAt: '', updatedAt: '', __v: 0, gender: '', dob: '', profilePic: '' });
  constructor(private http: HttpClient) { }

  /**
   * register the user into DB
   * @param userDetails registration details of user
   * @returns observable of post method
   */
  registerUser(userDetails: any): Observable<any> {
    return this.http.post(AUTH.REGISTER_API, userDetails);
  }

  /**
   * log in the user if email exists
   * @param userDetails email & password
   * @returns post request observable
   */
  loggedInUser(userDetails: any): Observable<any> {
    return this.http.post(AUTH.LOGIN_API, userDetails);
  }

  /**
   * @returns login Token 
   */
  getLoginTokenFromLocalStorage() {
    return localStorage.getItem('loginToken');
  }

  /**
   * @returns single user details
   */
  getSingleUser(): Observable<any> {
    return this.http.get(AUTH_PREFIX)
  }
}
